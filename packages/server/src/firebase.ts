// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if (!process.env.FIREBASE_API_KEY)
    console.log('Please provide "FIREBASE_API_KEY" in .env');
if (!process.env.FIREBASE_AUTH_DOMAIN)
    console.log('Please provide "FIREBASE_AUTH_DOMAIN" in .env');
if (!process.env.FIREBASE_PROJECT_ID)
    console.log('Please provide "FIREBASE_PROJECT_ID" in .env');
if (!process.env.FIREBASE_STORAGE_BUCKET)
    console.log('Please provide "FIREBASE_STORAGE_BUCKET" in .env');
if (!process.env.FIREBASE_MESSAGING_SENDER_ID)
    console.log('Please provide "FIREBASE_MESSAGING_SENDER_ID" in .env');
if (!process.env.FIREBASE_APP_ID)
    console.log('Please provide "FIREBASE_APP_ID" in .env');
if (!process.env.FIREBASE_MEASUREMENT_ID)
    console.log('Please provide "FIREBASE_MEASUREMENT_ID" in .env');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((yes) =>
    yes ? getAnalytics(app) : null
);
