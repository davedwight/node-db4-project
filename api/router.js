const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    helpers.getRecipeById(id)
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(next);
});

module.exports = router;