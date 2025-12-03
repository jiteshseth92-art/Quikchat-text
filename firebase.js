import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA48jHU548TouWUWNZF6EW2u2jiNdEhd7k",
  authDomain: "quikchat-global-31d48.firebaseapp.com",
  projectId: "quikchat-global-31d48",
  storageBucket: "quikchat-global-31d48.firebasestorage.app",
  messagingSenderId: "227308003822",
  appId: "1:227308003822:web:815d471bc922fa65996eff"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
