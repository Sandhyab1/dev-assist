// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpCG76S4O9QUOJ5_7NWTHduPwMcc3G83Y",
  authDomain: "dev-assist-4b1c9.firebaseapp.com",
  projectId: "dev-assist-4b1c9",
  storageBucket: "dev-assist-4b1c9.firebasestorage.app",
  messagingSenderId: "682595936388",
  appId: "1:682595936388:web:2839b260b4add18abd7ad1",
  measurementId: "G-60Z5NBFKJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, app, analytics, provider };