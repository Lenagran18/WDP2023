const express = require("express");
const Note = require("../models/notes");
const router = express.Router();

router.get('/getAllNotes', (req, res) => {
    try {
        const notes = Note.getusers();
        res.send(notes);
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router;