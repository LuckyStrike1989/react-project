// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD20klwJQAp5adXV6Qh-uJ25eWBO1lx5Rg",
  authDomain: "react-community-e215c.firebaseapp.com",
  projectId: "react-community-e215c",
  storageBucket: "react-community-e215c.appspot.com",
  messagingSenderId: "423412714172",
  appId: "1:423412714172:web:c841f362c042632ccadeb9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;