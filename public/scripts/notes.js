let noteForm = document.getElementById("note-form");
if (noteForm) noteForm.addEventListener('submit', createNote);

function createNote(e){
    e.preventDefault();

    let note = {
        "content": document.getElementById('note').value,
        "userId": 1
    }
    let noteList = document.getElementById("noteList")
    noteList.innerHTML=""
    
    fetchData("/notes/createNote", note, "POST")
    .then(data => {
        if(!data.message) {
            console.log(data)
            for(let i = 0; i<data.length; i++) {
                noteList.innerHTML += `<li>${data[i].Content}</li></br>`
                document.getElementById('note').value=""
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
    
}
function getNotes(){
    let note = {"userId": 1}
    let noteList = document.getElementById("noteList")
    noteList.innerHTML=""
    
    fetchData("/notes/getNotes", note, "POST")
    .then(data => {
        if(!data.message) {
            console.log(data)
            for(let i = 0; i<data.length; i++) {
                noteList.innerHTML += `<li>${data[i].Content}</li></br>`
                document.getElementById('note').value=""
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
}


let nav = document.querySelector("nav")

if(getCurrentUser()) {
  nav.innerHTML = `
     <ul>
        <li><a href="notes.html">Notes</a></li>
        <li><a href="profile.html">Profile</a></li>
        <li><a id="logout">Logout</li>
      </ul>
  `
} else {
  nav.innerHTML = `
     <ul>
       <li><a href="notes.html">Notes</a></li>
       <li><a href="profile.html">Profile</a></li>
       <li><a href="login.html">Login</a></li>
       <li><a href="register.html">Sign Up</a></li>
     </ul>
  `
}

// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
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

// LOCAL STORAGE FUNCTIONALITY
export function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}

export function logout() {
  localStorage.removeItem('user')
  window.location.href = "login.html"
}

let logoutBtn = document.getElementById("logout")
if(logoutBtn) logoutBtn.addEventListener("click", logout)