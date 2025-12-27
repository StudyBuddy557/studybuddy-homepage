import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

// TEMPORARILY COMMENTED OUT - will fix later
// export { aiTutor } from "./aiTutor"; 

export * from './triggers/onMessageCreated';