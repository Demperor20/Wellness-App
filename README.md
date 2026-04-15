# Vitality Streak

A premium health and wellness platform for tracking vitality and longevity. This project is a cross-platform ecosystem including a Web App (PWA), Android App, and iOS App.

## 🚀 Getting Started

### Web Application (React + Vite)

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Build for Production**:
    ```bash
    npm run build
    ```
    The production-ready files will be in the `dist/` folder.

### Android Application (Kotlin)

The Android source code is located in the `/android` directory.
- Open the `/android` folder in **Android Studio**.
- Ensure you have `google-services.json` in `android/app/`.
- See `android/README_ANDROID.md` for detailed setup.

### iOS Application (SwiftUI)

The iOS source code is located in the `/ios` directory.
- Open the `/ios/VitalityStreak` project in **Xcode**.
- Add the **Family Controls** capability.
- See `ios/README_IOS.md` for detailed setup.

## 🌐 Deployment (GitHub Pages)

If you are deploying the web app to GitHub Pages:
1.  Run `npm run build`.
2.  Deploy the contents of the `dist/` folder to your `gh-pages` branch.
3.  The `vite.config.ts` is already configured with `base: './'` to support hosting in subdirectories.

## 📱 PWA Features

This app is a Progressive Web App. Once deployed:
- It can be installed on mobile/desktop home screens.
- It uses a Service Worker (`sw.js`) for offline caching of core assets.
- It includes a `manifest.json` for native-like branding.

## 🛠 Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Framer Motion.
- **Backend**: Firebase (Auth, Firestore).
- **Mobile**: Kotlin (Android), SwiftUI (iOS).
- **Icons**: Lucide React.
- **Charts**: Recharts.
