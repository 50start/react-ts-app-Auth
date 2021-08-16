import firebase from "firebase";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR2psXDXlhYLy-CrotoozBDn6PS5FfHpE",
  authDomain: "typescript-todo-d8dc4.firebaseapp.com",
  projectId: "typescript-todo-d8dc4",
  storageBucket: "typescript-todo-d8dc4.appspot.com",
  messagingSenderId: "833033148229",
  appId: "1:833033148229:web:7a028856fb3772a586d02c",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
