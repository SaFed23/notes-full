const express = require('express');
const router = express.Router();
const { Notes } = require("../db");


router.get('/', function(req, res, next) {
    Notes.getAll((err, tasks) => {
        res.json(tasks);
    });
});

router.post('/new', (req, res, next) => {
    Notes.createNewNote(req.body.note, (err) => { res.json(err) });
});

router.delete('/delete/:id', (req, res) => {
    Notes.deleteById(req.params.id, (err) => { res.json(err) });
});

router.put('/update/:id', (req, res) => {
    Notes.update(req.params.id, req.body.note, (err) => { res.json(err) });
});

module.exports = router;