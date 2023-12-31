const con = require("./db_connect");

async function createTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS notes (
        NoteId INT NOT NULL AUTO_INCREMENT,
        UserId INT NOT NULL,
        Content VARCHAR (255) NOT NULL,
        Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT NotePK PRIMARY KEY(NoteId),
        CONSTRAINT UserFK FOREIGN KEY(UserId) REFERENCES User(UserId));`

    await con.query(sql);
}

createTable()

// CRUD Operations 

//Are the headers correct for each CRUD operation??

// Create a note
async function createNote(userId, content) {
    let sql = ` 
        INSERT INTO notes(UserID, Content)
        VALUES("${userId}", "${content}")
    `

    await con.query(sql)

    let noteResult = await readNotes(userId)
    return noteResult

}

// Read a note 
async function readNotes(userId) {
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

async function deleteNote(userId) {
    let sql = `
        DELETE FROM notes
        WHERE UserId = ${userId}
    `

    await con.query(sql)
}

module.exports = { createNote, readNotes, updateNote, deleteNote }