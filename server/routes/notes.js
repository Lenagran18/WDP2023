const express = require("express");
const Note = require("../models/notes");
const router = express.Router();

router

    .get('/getAllNotes', async (req, res) => {
        try {
            const notes = await Note.getNotes();
            res.send(notes);
        } catch (err) {
            res.status(401).send({ message: err.message })
        }
    })

    // Create note route 
    .post('/createNote', async (req, res) => {
        try {
            const note = await Note.createNote(req.body.userId, req.body.content)
            res.send(note)
        } catch (err) {
            res.status(401).send({ message: err.message })
        }
    })

    //Read route
    // .post('/getNote', async (req, res) => {
    //     try {
    //         const note = await Note.readNote(req.body.noteId);
    //         res.send(note)
    //     } catch(err) {
    //         res.status(401).send({message: err.message})
    //     }
    // })

    //Read all notes route
    .post('/getNotes', async (req, res) => {
        try {
            const note = await Note.readNotes(req.body.userId);
            res.send(note)
        } catch (err) {
            res.status(401).send({ message: err.message })
        }
    })
    //Update route
    .put('/updateNote', async (req, res) => {
        try {
            let note = await Note.updateNote(req.body)
            res.send(note)
        } catch (err) {
            res.status(401).send({ message: err.message })
        }
    })

    //Delete route 
    .delete('/delete', async (req, res) => {
        try {
            await Note.deleteNote(req.body)
            res.send({ success: "Note was deleted" })
        } catch (err) {
            res.status(401).send({ message: err.message })
        }
    })

    // Create a route to delete all notes for a given user
    .delete('/deleteAllNotes', async (req, res) => {
        try {
            const userId = req.body.userId; // Assuming the userId is sent in the request body

            // Call a function that deletes all notes for the given user
            await Note.deleteAllNotes(userId);

            res.send({ success: "All notes were deleted" });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            await Note.deleteNote(req.body);
            res.send({ success: "Note was deleted" });
            clearAndFetchNotes(); // Trigger a refresh after deletion
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

module.exports = router; 