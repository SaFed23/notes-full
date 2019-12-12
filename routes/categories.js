const express = require('express');
const router = express.Router();
const { Categories, Notes } = require("../db");


router.get('/', function(req, res, next) {
    Categories.getAll((err, categories) => {
        res.json(categories);
    });
});

router.post('/new', (req, res, next) => {
    Categories.createNewCategory(req.body.category, (err) => { res.json(err) });
});

router.delete('/delete/:id', (req, res) => {
    Notes.deleteByCategory(req.params.id, (errFromNotes) => {
        Categories.deleteById(req.params.id, (errFromCategories) => {
            res.json({
                errFromCategories: errFromCategories,
                errFromNotes: errFromNotes,
            });
        });
    });
});

module.exports = router;