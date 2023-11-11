let noteForm = document.getElementById("note-form");
if (noteForm) noteForm.addEventListener('submit', createNote);

function createNote(e){
    e.preventDefault();

    let note = document.getElementById('note').value
    let noteList = document.getElementById("noteList")

    let li = document.createElement('li')
    li.innerText = note
    noteList.appendChild(li);

    document.getElementById('note').value=""
    noteList.value = "";
}
console.log(`${note}`);