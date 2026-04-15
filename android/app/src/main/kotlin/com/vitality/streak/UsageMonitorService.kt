package com.vitality.streak

import android.app.Service
import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.SetOptions
import java.util.*
import java.text.SimpleDateFormat

class UsageMonitorService : Service() {

    private val handler = Handler(Looper.getMainLooper())
    private val db = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()
    
    // Target package names mapping to generic keys
    private val targetApps = mapOf(
        "com.facebook.katana" to "facebook",
        "com.instagram.android" to "instagram",
        "com.twitter.android" to "twitter",
        "com.whatsapp" to "whatsapp"
    )

    private val runnable = object : Runnable {
        override fun run() {
            checkForegroundApp()
            handler.postDelayed(this, 60000) // Run every 60 seconds
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        handler.post(runnable)
        return START_STICKY
    }

    private fun checkForegroundApp() {
        val usageStatsManager = getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val endTime = System.currentTimeMillis()
        val startTime = endTime - 60000 // Look at the last minute

        val events = usageStatsManager.queryEvents(startTime, endTime)
        val event = UsageEvents.Event()
        var lastForegroundApp = ""

        while (events.hasNextEvent()) {
            events.getNextEvent(event)
            if (event.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND) {
                lastForegroundApp = event.packageName
            }
        }

        targetApps[lastForegroundApp]?.let { genericKey ->
            updateUsageInFirestore(genericKey, 1) // Add 1 minute
        }
    }

    private fun updateUsageInFirestore(packageName: String, minutesToAdd: Long) {
        val currentUser = auth.currentUser ?: return
        val userId = currentUser.uid
        val today = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
        
        // Document ID is {userId}_{date} to match security rules
        val statId = "${userId}_$today"
        val docRef = db.collection("usage_stats").document(statId)

        db.runTransaction { transaction ->
            val snapshot = transaction.get(docRef)
            val currentData = snapshot.get(packageName) as? Long ?: 0L
            
            val data = mutableMapOf<String, Any>(
                "userId" to userId,
                "date" to today,
                packageName to currentData + minutesToAdd
            )
            
            transaction.set(docRef, data, SetOptions.merge())
        }.addOnSuccessListener {
            // Data successfully synced
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
