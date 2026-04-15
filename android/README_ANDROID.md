# Vitality Streak - Android Usage Monitor

This Android component allows the Vitality Streak app to monitor social media usage at the OS level and sync it to Firestore in real-time.

## Setup Instructions

1.  **Firebase Project**: Ensure your Android app is registered in the same Firebase project as your web app.
2.  **Google Services**: Download `google-services.json` from the Firebase Console and place it in the `android/app/` directory.
3.  **Permissions**:
    *   The app requires the `PACKAGE_USAGE_STATS` permission.
    *   I have added a `MainActivity` that provides a button to directly open the **Usage Access** settings for you.
    *   Once granted, the app will automatically start the monitoring service.
4.  **Authentication**: The service uses `FirebaseAuth.getInstance().currentUser`. Ensure the user is logged into the Android app with the same account as the web app.
5.  **Syncing**: The service updates Firestore every 60 seconds when a target app (Facebook, Instagram, X, WhatsApp) is in the foreground.

## Data Structure

Data is stored in the `usage_stats` collection with document IDs in the format `{userId}_{YYYY-MM-DD}`.

```json
{
  "userId": "...",
  "date": "2024-04-15",
  "com.facebook.katana": 15,
  "com.instagram.android": 30
}
```

The web dashboard listens to this collection for real-time updates.
