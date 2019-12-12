const express = require('express');
const router = express.Router();
const { TODO } = require("../db");


router.get('/', function(req, res, next) {
    TODO.getAll((err, tasks) => {
        res.json(tasks);
    });
});

router.post('/new', (req, res, next) => {
    TODO.createNewTask(req.body.task, (err) => { res.json(err) });
});

router.delete('/delete/:id', (req, res) => {
    TODO.deleteById(req.params.id, (err) => { res.json(err) });
});

module.exports = router;