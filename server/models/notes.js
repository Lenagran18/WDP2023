const con = require("./db_connect");

async function createTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS notes (
        NoteId INT NOT NULL AUTO_INCREMENT,
        UserId INT NOT NULL,
        Content VARCHAR (255) NOT NULL,
        Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT NotePK PRIMARY KEY(NoteId),
        CONSTRAINT UserFK FOREIGN KEY(UserID) REFERENCES User(UserID);`
  
        await con.query(sql);
    }

    createTable()

// CRUD Operations 

//Are the headers correct for each CRUD operation??

// Create a note
async function createNote(userId, content) {
    let noteResult = await GetNote(note.noteText)

    let sql = ` 
        INSERT INTO notes(UserID, Content)
        VALUES("${userId}", "${content}")
    `

    await con.query(sql)
}

// Read a note 
async function readNote(userId) {
    let sql = `
        SELECT * FROM notes
        WHERE UserId = ${userId}
    `

    return await con.query(sql)
}

// Update a note

async function updateNote(noteId, content) {
    let sql = `
        UPDATE notes 
        SET Content = "${content}"
        WHERE NoteId = ${noteId}
    `

    await con.query(sql)
}

// Delete a note 

async function deleteNote(noteId) {
    let sql = `
        DELETE FROM notes
        WHERE NoteId = ${noteId}
    `

    await con.query(sql)
}
module.exports = { createNote, readNote, updateNote, deleteNote }