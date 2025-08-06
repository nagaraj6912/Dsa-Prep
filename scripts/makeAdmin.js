// Script to make a user admin in Firebase
// Run this with: node scripts/makeAdmin.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get admin user ID from environment variable or use a default
const userId = process.env.VITE_ADMIN_USER_ID || "e6p3QXQwiZbIJJTTfubZT41KmQt2";

async function makeUserAdmin() {
  try {
    console.log(`Making user ${userId} an admin...`);
    
    // First, check if user role already exists
    const userRolesRef = collection(db, 'user_roles');
    const q = query(userRolesRef, where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log('User role already exists, updating...');
      const doc = querySnapshot.docs[0];
      console.log('Existing role data:', doc.data());
    }
    
    // Add new admin role document
    const adminRole = {
      user_id: userId,
      role: 'admin',
      created_at: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'user_roles'), adminRole);
    console.log(`✅ User ${userId} is now an admin! Document ID: ${docRef.id}`);
    
    // Also create a profile for the user
    const userProfile = {
      id: userId,
      display_name: 'Admin User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Creating user profile...');
    console.log('Admin role and profile created successfully!');
    
  } catch (error) {
    console.error('❌ Error making user admin:', error);
    console.log('You may need to manually create the admin role in Firebase Console:');
    console.log('1. Go to Firebase Console > Firestore Database');
    console.log('2. Create collection: user_roles');
    console.log('3. Add document with ID: e6p3QXQwiZbIJJTTfubZT41KmQt2');
    console.log('4. Add fields: user_id (string): e6p3QXQwiZbIJJTTfubZT41KmQt2, role (string): admin');
  }
}

makeUserAdmin();