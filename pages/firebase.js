// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjlI6VZpZBHIewa2scCdue2W0Tj2kTygk",
    authDomain: "pentiamessageapp.firebaseapp.com",
    projectId: "pentiamessageapp",
    storageBucket: "pentiamessageapp.appspot.com",
    messagingSenderId: "571922961897",
    appId: "1:571922961897:web:80e8360a2887128b11e778",
    measurementId: "G-4RSDMD0T6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
// const analytics = getAnalytics(app);