package com.vitality.streak

import android.app.AppOpsManager
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Simple programmatic layout for demonstration
        val layout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            gravity = android.view.Gravity.CENTER
            setPadding(50, 50, 50, 50)
        }

        val statusText = TextView(this).apply {
            text = "Vitality Streak Usage Monitor"
            textSize = 20f
            gravity = android.view.Gravity.CENTER
            setPadding(0, 0, 0, 50)
        }
        layout.addView(statusText)

        val permissionButton = Button(this).apply {
            text = "Grant Usage Access"
            setOnClickListener {
                checkAndRequestPermission()
            }
        }
        layout.addView(permissionButton)

        val startServiceButton = Button(this).apply {
            text = "Start Monitoring Service"
            setOnClickListener {
                startService(Intent(this@MainActivity, UsageMonitorService::class.java))
            }
        }
        layout.addView(startServiceButton)

        setContentView(layout)
    }

    private fun checkAndRequestPermission() {
        val appOps = getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
        val mode = appOps.checkOpNoThrow(
            AppOpsManager.OPSTR_GET_USAGE_STATS,
            android.os.Process.myUid(),
            packageName
        )
        
        if (mode != AppOpsManager.MODE_ALLOWED) {
            startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))
        } else {
            // Permission already granted
            android.widget.Toast.makeText(this, "Permission already granted", android.widget.Toast.LENGTH_SHORT).show()
        }
    }

    override fun onResume() {
        super.onResume()
        // Check if service should be started automatically if permission is granted
        val appOps = getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
        val mode = appOps.checkOpNoThrow(
            AppOpsManager.OPSTR_GET_USAGE_STATS,
            android.os.Process.myUid(),
            packageName
        )
        if (mode == AppOpsManager.MODE_ALLOWED) {
            startService(Intent(this, UsageMonitorService::class.java))
        }
    }
}
