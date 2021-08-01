import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCpz4lYrlqoRbQtL_uWY91EaCixt158A5s",
  authDomain: "instagram-clone-react-cb6af.firebaseapp.com",
  projectId: "instagram-clone-react-cb6af",
  storageBucket: "instagram-clone-react-cb6af.appspot.com",
  messagingSenderId: "207662302245",
  appId: "1:207662302245:web:02456ce8bd9b8ba51babcc",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
