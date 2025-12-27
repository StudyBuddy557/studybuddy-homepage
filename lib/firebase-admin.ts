// lib/firebase-admin.ts
import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export const initAdmin = () => {
  // 1. If already initialized, use that one
  if (getApps().length > 0) {
    return getApp();
  }

  // 2. Check for keys SAFELY
  if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    // If we are just building the app, this might happen. Don't crash!
    console.warn("⚠️ Firebase Admin Env Vars missing. Skipping DB init (this is fine during build).");
    return null; 
  }

  // 3. Initialize if we have keys
  return initializeApp({
    credential: cert(serviceAccount),
  });
};

// Initialize immediately (safely)
const app = initAdmin();

// Export Firestore. If app is null (missing keys), adminDb will be null.
// Your route.ts already handles "if (!adminDb)" so this is perfect.
export const adminDb = app ? getFirestore(app) : null;