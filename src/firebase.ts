import firebase from "firebase";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
