// login.js
import { database } from './firebase-config.js';
import { ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";


function loginUser(email, password) {
    const usersRef = ref(database, 'users');

    get(usersRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                // Loop through each user in the database
                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val();
                    if (userData.email === email) {
                        if (userData.password === password) {
                            alert("Logado com sucesso!")
                            localStorage.setItem('uid', childSnapshot.key);
                            // Redirect to dashboard or home page
                            window.location.href = '../index.html';
                            return; 
                        } else {
                            console.error("Invalid password");
                            alert("Invalid password");
                            return; 
                        }
                    }else{
                        console.error("Email Inválido");
                        
                    }
                });
          
            } else {
                console.error("No users found");
                alert("No users found");
            }
        })
        .catch((error) => {
            console.error("Error logging in user:", error);
            alert("Error logging in user");
        });
}

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // informação dos forms
    const email = document.getElementById('email').value;
    const password = document.getElementById('your_pass').value;

    // Call the function to log in the user
    loginUser(email, password);
});
