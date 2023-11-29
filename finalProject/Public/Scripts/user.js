// For Register & Login forms
class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}

let registerForm = document.getElementById("register-form");
if (registerForm) registerForm.addEventListener('submit', register);

function register(e) {
    e.preventDefault();
    
    let fName = document.getElementById('fName').value;
    let lName = document.getElementById('lName').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let newUser = new User(fName, lName, username, password);

    let welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.innerHTML = `Welcome, ${username}!`;
}

let loginForm = document.getElementById("login-form");
if (loginForm) loginForm.addEventListener('submit', login);

function login(e){
    e.preventDefault();
 
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.innerHTML = `Welcome, ${username}!`<br>;
}
