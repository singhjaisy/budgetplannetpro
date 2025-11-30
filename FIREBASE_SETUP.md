# 🔥 Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `budget-planner-pro`
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (for development)
4. Choose a location (closest to your users)
5. Click "Enable"

## Step 3: Enable Authentication

1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Enable "Email/Password" provider
4. Click "Save"

## Step 4: Get API Keys

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click Web icon (</>)
4. Register app name: `Budget Planner Pro`
5. Copy the Firebase config (you'll need this)

## Step 5: Install Firebase SDK

```bash
npm install firebase
```

## Step 6: Configure Firebase

Create `src/firebase/config.js` with your Firebase config.

## Step 7: Update Security Rules

In Firestore, go to Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Budget items - users can only access their own
    match /budgetItems/{userId}/items/{itemId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 8: Test

1. Run the app
2. Sign up a new user
3. Add some budget items
4. Check Firestore console - data should appear!

---

**Need help?** I can implement this for you automatically!

