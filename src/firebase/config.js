import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCaU_HGfyPLFzM089o1M3C7MSkk21Q0brc",
  authDomain: "prog3-grupo7.firebaseapp.com",
  projectId: "prog3-grupo7",
  storageBucket: "prog3-grupo7.firebasestorage.app",
  messagingSenderId: "594246929150",
  appId: "1:594246929150:web:7bb6747c5713d3d3c5b3af",
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
