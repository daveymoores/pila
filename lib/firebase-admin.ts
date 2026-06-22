import { type App, cert, getApps, initializeApp } from "firebase-admin/app";
import { type Auth, getAuth } from "firebase-admin/auth";
import { type Firestore, getFirestore } from "firebase-admin/firestore";

let app: App | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

function hasAdminCredentials(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY,
  );
}

function getAdminApp(): App {
  if (!app) {
    if (!hasAdminCredentials()) {
      throw new Error(
        "Firebase Admin credentials are not configured. Use MOCK_INTEGRATIONS=true for local testing.",
      );
    }

    app = getApps().length
      ? getApps()[0]
      : initializeApp({
          credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        });
  }

  return app;
}

export function getFirebaseAdminAuth(): Auth {
  if (!auth) {
    auth = getAuth(getAdminApp());
  }

  return auth;
}

export function getFirebaseAdminDb(): Firestore {
  if (!db) {
    db = getFirestore(getAdminApp());
  }

  return db;
}

/** @deprecated Use getFirebaseAdminAuth() */
export { getFirebaseAdminAuth as auth };

/** @deprecated Use getFirebaseAdminDb() */
export { getFirebaseAdminDb as db };
