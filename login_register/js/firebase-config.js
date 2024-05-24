import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4MLckFlgiqIhaR1j4zEgXhBkqKEZGa98",
  authDomain: "gamesales-278f2.firebaseapp.com",
  databaseURL: "https://gamesales-278f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamesales-278f2",
  storageBucket: "gamesales-278f2.appspot.com",
  messagingSenderId: "17073831376",
  appId: "1:17073831376:web:0b1fb6101bbe3cefcfcdd5",
  measurementId: "G-D711GPRGV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };