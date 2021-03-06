import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgJFQPQhWbcN4svKJesVCQIrSETrGToc0",
  authDomain: "survey-realtime.firebaseapp.com",
  databaseURL: "https://survey-realtime-default-rtdb.firebaseio.com",
  projectId: "survey-realtime",
  storageBucket: "survey-realtime.appspot.com",
  messagingSenderId: "1061771885211",
  appId: "1:1061771885211:web:024aabc326214bfd8ba43e",
  measurementId: "G-D1V493Q0YF",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = fb.database();
const auth = fb.auth();

export { db, auth, firebase };
