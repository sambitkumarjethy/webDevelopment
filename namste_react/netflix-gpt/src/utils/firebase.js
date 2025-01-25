// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnuflpRtSxjifJJ-822_J6KbAWBiBIxmQ",
  authDomain: "netflixgpt-73b37.firebaseapp.com",
  projectId: "netflixgpt-73b37",
  storageBucket: "netflixgpt-73b37.firebasestorage.app",
  messagingSenderId: "693389302895",
  appId: "1:693389302895:web:440d91de515b1b5c19c19a",
  measurementId: "G-W1FS2V887J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
