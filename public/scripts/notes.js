let noteForm = document.getElementById("note-form");
if (noteForm) noteForm.addEventListener('submit', createNote);

function createNote(e) {
    e.preventDefault();

    let userId = getCurrentUserId();
    if (!userId) {
        console.log("User ID not found. User might not be logged in.");
        return;
    }

    let note = {
        "content": document.getElementById('note').value,
        "userId": userId
    }

    console.log("Note to be created:", note); // Log the note before sending

    fetchData("/notes/createNote", note, "POST")
        .then(data => {
            console.log("Response Data:", data); // Log the response data
            for (let i = 0; i < data.length; i++) {
                noteList.innerHTML += `<li>${data[i].Content}</li></br>`
                document.getElementById('note').value = ""
                // USE THIS INSTEAD IF YOU WANT TO RESTART NOTES LIST EACH TIME
                // if(!data.message) {
                //     let noteList = document.getElementById("noteList");
                //     noteList.innerHTML += `<li>${data[data.length - 1].Content}</li><br>`;
                //     document.getElementById('note').value = "";
            }
        })
        .catch(err => {
            console.log("Error:", err);
        })
}

/*
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
*/

let nav = document.querySelector("nav")

if (getCurrentUser()) {
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
    if (response.ok) {
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

function getCurrentUserId() {
    const user = getCurrentUser();
    return user ? user.UserId : null;
}

let logoutBtn = document.getElementById("logout")
if (logoutBtn) logoutBtn.addEventListener("click", logout)