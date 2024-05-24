// register.js
import { database } from './firebase-config.js';
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Function to generate a random UID
function generateUID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < 20; i++) {
        uid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uid;
}

// Function to register a new user
async function registerUser(name, email, password) {
    const userData = {
        name: name,
        email: email,
        password: password,
        uid: generateUID() // Generate a random UID
    };

    // Obtain a reference to the "users" collection in Firebase Realtime Database
    const usersRef = ref(database, 'users/' + userData.uid);

    // Check if the email already exists
    try {
        const snapshot = await get(child(ref(database), 'users/' + email.replace(/\./g, '_')));
        if (snapshot.exists()) {
            alert("Email already exists!");
            return;
        }
    } catch (error) {
        console.error("Error checking email:", error);
        return;
    }

    // Add the user data to the Realtime Database
    set(usersRef, userData)
        .then(() => {
            alert("User registered successfully!");
            window.location.href = './login.html';
        })
        .catch((error) => {
            console.error("Error registering user:", error);
        });
}

// Event listener for the registration form
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form field values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const repeatPassword = document.getElementById('re_pass').value;

    // Verify that passwords match
    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Call the function to register the user
    registerUser(name, email, password);
});
