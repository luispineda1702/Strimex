// presentation/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAE6KSUNVz7LmA9kbW7bAugrNO995F05K0",

  authDomain: "strimex-fb.firebaseapp.com",

  projectId: "strimex-fb",

  storageBucket: "strimex-fb.firebasestorage.app",

  messagingSenderId: "879441089060",

  appId: "1:879441089060:web:c3ef06a55e38ebf8ccbeb1"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
