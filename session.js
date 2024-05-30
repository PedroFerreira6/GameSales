// session.js
import { database } from './login_register/js/firebase-config.js';
import { ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Function to retrieve user data using the UID
function getUserData(uid) {
    const usersRef = ref(database, 'users');

    // Search for the user data using the UID
    get(child(usersRef, uid))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                var liname=document.getElementById('username')
                liname.text=userData.name
                console.log("User Data:", userData); // Display user data
            } else {
                console.error("User data not found for UID:", uid);
            }
        })
        .catch((error) => {
            console.error("Error getting user data:", error);
        });
}

// Verificar se o UID do usuário está armazenado no localStorage
const uid = localStorage.getItem('uid');

if (uid) {
    console.log("User is logged in"); // Usuário está logado
    getUserData(uid);

    var buttonsign = document.getElementById('signin');
    buttonsign.innerText = "Logout"
    buttonsign.addEventListener('click', function () {
        event.preventDefault();
        localStorage.removeItem('uid');
        console.log("User logged out successfully!");
        // Redirect to login page
        window.location.href = './index.html';
    })
  
    var favlink=document.getElementById('favlink')
    
} else {
    console.log("User is not logged in");
    var favli=document.getElementById('lilink');
    var favlink=document.getElementById('favlink')
    favlink.setAttribute('href',"");
    favli.innerHTML=" "

    var linick=document.getElementById('linick');
    var liname=document.getElementById('username')
    linick.innerHTML=" "
}
