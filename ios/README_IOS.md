# Vitality Streak - iOS Screen Time Integration

This iOS component allows the Vitality Streak app to monitor social media usage using Apple's **Screen Time API** (FamilyControls & DeviceActivity) and sync it to Firestore.

## Setup Instructions

1.  **Xcode Project**: Create a new SwiftUI project named `VitalityStreak`.
2.  **Capabilities**:
    *   Add the **Family Controls** capability in Xcode (Target > Signing & Capabilities).
    *   Add the **Push Notifications** capability if you plan to use them.
3.  **Firebase**:
    *   Add the `FirebaseFirestore` and `FirebaseAuth` Swift packages.
    *   Download `GoogleService-Info.plist` from the Firebase Console and add it to your project.
4.  **Permissions**:
    *   The app will prompt for Screen Time authorization on the first launch using the code provided in `VitalityStreakApp.swift`.
5.  **Monitoring**:
    *   The app now includes a **"Select Apps to Monitor"** button.
    *   This triggers the system `familyActivityPicker`, allowing you to choose Facebook, Instagram, etc., directly from your installed apps.
    *   To track usage, you need to implement a `DeviceActivityMonitorExtension` that uses the `selection` tokens.

## Data Structure

Data is stored in the `usage_stats` collection, perfectly synchronized with the Android and Web versions of the app.

```json
{
  "userId": "...",
  "date": "2024-04-15",
  "facebook": 12,
  "instagram": 45
}
```
