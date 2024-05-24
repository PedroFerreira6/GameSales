

var signinButton = document.getElementById('signin');

signinButton.addEventListener('click', function() {
    var nameOfUser = document.getElementById('your_name');
    var Htmlpassword = document.getElementById('your_pass');

    var nameOfUserValue = nameOfUser.value;
    var passwordValue = Htmlpassword.value;

    console.log(nameOfUserValue);
    console.log(passwordValue);
});

/* 
class UniqueTopSellers {
    constructor(userName, email, password) {
        this.username = userName;
        this.email = email;
        this.password = password;
    }
}
*/

