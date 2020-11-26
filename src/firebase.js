import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

var firebaseConfig = {
  apiKey: "AIzaSyCm8TqQTe71jI5rBxebWDS9smOiCYHbcoY",
  authDomain: "ecommerce-react-firebase-5e0ad.firebaseapp.com",
  databaseURL: "https://ecommerce-react-firebase-5e0ad.firebaseio.com",
  projectId: "ecommerce-react-firebase-5e0ad",
  storageBucket: "ecommerce-react-firebase-5e0ad.appspot.com",
  messagingSenderId: "37999398206",
  appId: "1:37999398206:web:52dd4b7118de0021b4706f",
  measurementId: "G-CDXS8L7XJK",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = fb.firestore();
const auth = fb.auth();

auth.onAuthStateChanged((user) => {
  console.log(user);
});

export { db, auth };
