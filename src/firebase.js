import firebase from "firebase/app"
import "firebase/firestore"
// ...
var firebaseConfig = {
    apiKey: "AIzaSyClFnZVr8IP16R-eLWwby0SagxhGmeefaI",
    authDomain: "enactusonline-45102.firebaseapp.com",
    projectId: "enactusonline-45102",
    storageBucket: "enactusonline-45102.appspot.com",
    messagingSenderId: "516395904204",
    appId: "1:516395904204:web:f98e45b60b425398b92669",
    measurementId: "G-1R321G40JF"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export default firebase