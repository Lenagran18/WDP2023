const express = require("express");
const Note = require("../models/notes");
const router = express.Router();

router

.get('/getAllNotes', async (req, res) => {
    try {
        const notes = await Note.getNotes(); // DO I WANT THIS FUNCTION?/GET NOTES BY USER ID?
        res.send(notes);
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// Create note route 
.post('/createNote', async (req, res) => {
    try {
        const note = await Note.createNote(req.body.content)
        res.send(note)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

//Read route
.get('/getNote', async (req, res) => {
    try {
        const note = await Note.getNote(req.body.noteId);
        res.send(note)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

//Update route
.put('/updateNote', async (req, res) => {
    try {
        let note = await Note.updateNote(req.body)
        res.send(note)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

//Delete route 
.delete('/delete', async (req, res) => {
    try {
        await Note.deleteNote(req.body)
        res.send({success: "Note was deleted"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router; 