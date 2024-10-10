import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
require('dotenv').config();
// const firebaseConfig = {
//   apiKey: "AIzaSyC6BDR8vZuUHiqt7VQkhLJ3pxYroNNjntA",
//   authDomain: "ecom-chat-1d35c.firebaseapp.com",
//   projectId: "ecom-chat-1d35c",
//   storageBucket: "ecom-chat-1d35c.appspot.com",
//   messagingSenderId: "517909678281",
//   appId: "1:517909678281:web:ee31dcdc6180e6a3cee518",
//   measurementId: "G-3X0P8VH3KR"
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase;
export const authentication = getAuth(initializeApp(firebaseConfig))