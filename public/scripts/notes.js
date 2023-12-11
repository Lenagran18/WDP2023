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

getNotes()
//     let li = document.createElement('li')
//     li.innerText = note
//     noteList.appendChild(li);

//     document.getElementById('note-form').value=""
//     noteList.value = "";
// }
// console.log(`${note}`);

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