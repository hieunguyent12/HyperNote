import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";


firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "testproject-30894.firebaseapp.com",
  projectId: "testproject-30894",
  storageBucket: "testproject-30894.appspot.com",
  messagingSenderId: "122726166277",
  appId: "1:122726166277:web:dfa7ac417505538af2116c",
  measurementId: "G-E1BED7MP2C",
});

firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
