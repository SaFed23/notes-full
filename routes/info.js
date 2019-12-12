const express = require('express');
const router = express.Router();
const { Categories, Notes, TODO } = require("../db");

router.get('/length', function(req, res, next) {
    const allInfo = {}
    TODO.getAll((err, todo) => {
        allInfo.todo = {
            err: err,
            arr: todo,
        };
    });

    Categories.getAll((err, categories) => {
        allInfo.categories = {
            err: err,
            arr: categories,
        };
    });

    Notes.getAll((err, notes) => {
        allInfo.notes = {
            err: err,
            arr: notes,
        };
        res.json(allInfo);
    })
});


module.exports = router;