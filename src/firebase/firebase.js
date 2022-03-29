import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM6c5HUlrb3gcCua1wY3fg4mkYnm8CQPY",
  authDomain: "nodejs-firebase-app-1f5de.firebaseapp.com",
  projectId: "nodejs-firebase-app-1f5de",
  storageBucket: "nodejs-firebase-app-1f5de.appspot.com",
  messagingSenderId: "754608790634",
  appId: "1:754608790634:web:7d90469d30d461811e3e13"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export function singInWithGoogle() {
  const GoogleAuthProvider = new app.auth.GoogleAuthProvider();

  return auth.signInWithPopup(GoogleAuthProvider);
}

export function singInWithEmailAndPassword(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function singUpWithEmailAndPassword(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function sendPasswordResetEmail(email) {
  return auth.sendPasswordResetEmail(email);
}

export function signOut() {
  return auth.signOut();
}

export function getCurrentUserToken() {
  if (!auth.currentUser) {
    return null;
  }

  return auth.currentUser.getIdToken();
}

export function getCurrentUserEmail() {
  if (!auth.currentUser) {
    return null;
  }

  return auth.currentUser.email;
}