import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase client SDK is only available in the browser");
  }

  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }

  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }

  return auth;
}

export async function getFirestoreInstance(): Promise<Firestore> {
  if (!firestore) {
    firestore = getFirestore(getFirebaseApp());
  }

  return firestore;
}

export default {
  getFirebaseApp,
  getFirebaseAuth,
  getFirestoreInstance,
};
