// For Register & Login forms

let loginForm = document.getElementById("login-form")
if(loginForm) loginForm.addEventListener('submit', login)

function login(e){
  e.preventDefault()

  let user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  }
// let welcomeMessage = document.getElementById('welcome-message');
//welcomeMessage.innerHTML = `Welcome, ${username}!`;

  fetchData("/users/login", user, "POST")
  .then(data => {
    if(!data.message) {
      console.log(data)
      window.location.href = "notes.html"
    }
  })
  .catch(err => {
    let errorSection = document.querySelector("#login-form .error")
    errorSection.innerText = err.message
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
  })
}

// class User {
//     constructor(firstName, lastName, username, password) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.username = username;
//         this.password = password;
//     }
// }

let registerForm = document.getElementById("register-form");
if (registerForm) registerForm.addEventListener('submit', register);

function register(e) {
    e.preventDefault();

    let newUser = {
      fName: document.getElementById("fName").value,
      lName: document.getElementById("lName").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }

    fetchData("/users/register", newUser, "POST")
    .then(data => {
      if(!data.message) {
        console.log(data)
        window.location.href = "notes.html"
      }
    })
    .catch(err => {
      console.log(err)
    })
    let welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.innerHTML = `Welcome, ${username}!`;
}

// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  if(response.ok) {
    return await response.json(); 
  } else {
    throw await response.json();
  }
} 