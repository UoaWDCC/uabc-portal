import { app } from "./app";
import { connectDB } from "./mongo";

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.FIREBASE_API_KEY);
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "uabc-portal.firebaseapp.com",
    projectId: "uabc-portal",
    storageBucket: "uabc-portal.appspot.com",
    messagingSenderId: "15776391462",
    appId: "1:15776391462:web:a06a04340cee318ec421e7",
    measurementId: "G-M3JXX4YCP1",
};

// Initialize Firebase
const auth = initializeApp(firebaseConfig);
// const analytics = getAnalytics(auth);

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const authen = getAuth(auth);

createUserWithEmailAndPassword(authen, "test@test.com", "123123")
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
    });
