// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// @ts-expect-error getReactNativePersistence is available at runtime for RN
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC63p4TMq26s3BNhE3lbPBzJSpFuFVXFAM",
  authDomain: "fiap-mobile-8ca1d.firebaseapp.com",
  projectId: "fiap-mobile-8ca1d",
  storageBucket: "fiap-mobile-8ca1d.firebasestorage.app",
  messagingSenderId: "205106941107",
  appId: "1:205106941107:web:5289c8c8b4c4d9378ff4c6"
};

// Initialize (or reuse) Firebase App
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth with React Native persistence (and guard against re-init in dev)
let auth = undefined as unknown as ReturnType<typeof getAuth>;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (_e) {
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };