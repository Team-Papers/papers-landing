import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwaIYm8iUGW_il1g7jGYfZDFMyZ0KUcIs",
  authDomain: "papersbook-f3826.firebaseapp.com",
  projectId: "papersbook-f3826",
  storageBucket: "papersbook-f3826.appspot.com",
  messagingSenderId: "232506897629",
  appId: "1:232506897629:web:c3c6d4dde4f71cca4d9734",
  measurementId: "G-G7BS2NSR0F",
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _provider: GoogleAuthProvider | null = null;

function getApp() {
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return _app;
}

export function getFirebaseAuth() {
  if (!_auth) {
    _auth = getAuth(getApp());
  }
  return _auth;
}

export function getGoogleProvider() {
  if (!_provider) {
    _provider = new GoogleAuthProvider();
  }
  return _provider;
}
