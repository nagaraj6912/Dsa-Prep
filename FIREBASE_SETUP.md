# Firebase Setup Guide

This project has been migrated from Supabase to Firebase. Follow these steps to complete the setup:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "dsa-roadmap")
4. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Save the changes

## 3. Set up Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location for your database
5. Click "Done"

## 4. Create Firestore Collections

Create the following collections in your Firestore database:

### Collections to create:
- `chapters`
- `lectures`
- `problems`
- `links`
- `profiles`
- `user_roles`
- `user_progress`

## 5. Update Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click the web app icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the configuration object

## 6. Update the Configuration File

Replace the placeholder values in `src/integrations/firebase/config.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 7. Set up Firestore Security Rules

In your Firestore Database, go to the "Rules" tab and add these basic rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read their own data
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read content
    match /chapters/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /lectures/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /problems/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /links/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Allow users to manage their own progress
    match /user_progress/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Allow users to manage their own roles
    match /user_roles/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
  }
}
```

## 8. Test the Application

1. Run `npm install` to ensure all dependencies are installed
2. Run `npm run dev` to start the development server
3. Test the authentication flow
4. Test creating and managing content (if you're an admin)

## 9. Optional: Set up Admin User

To create an admin user:

1. Sign up normally through the app
2. In Firebase Console, go to Firestore Database
3. Find the `user_roles` collection
4. Find your user's document
5. Change the `role` field from `"user"` to `"admin"`

## Troubleshooting

- **Authentication errors**: Make sure Email/Password auth is enabled
- **Database errors**: Check that Firestore is created and rules are set correctly
- **Permission errors**: Verify the security rules allow the operations you're trying to perform

## Migration Notes

- The app now uses Firebase Auth instead of Supabase Auth
- Database operations use Firestore instead of Supabase's PostgreSQL
- User progress is stored locally by default, with optional Firebase sync
- All Supabase-specific code has been removed 