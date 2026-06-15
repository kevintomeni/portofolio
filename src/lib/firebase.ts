import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getApp(): FirebaseApp {
  if (getApps().length > 0) return getApps()[0];
  return initializeApp(firebaseConfig);
}

let _db: Firestore | null = null;
let _auth: Auth | null = null;
let _storage: FirebaseStorage | null = null;

export function getDb(): Firestore {
  if (!_db) _db = getFirestore(getApp());
  return _db;
}

export function getAuthInstance(): Auth {
  if (!_auth) _auth = getAuth(getApp());
  return _auth;
}

export function getStorageInstance(): FirebaseStorage {
  if (!_storage) _storage = getStorage(getApp());
  return _storage;
}
