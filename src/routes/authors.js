router.get('/authors/:id/books', async (req, res) => {
    const authorId = req.params.id;
    const books = await db.Book.findAll({ where: { authorId } });
    res.render('authorBooks', { books });
});

const express = require('express');
const router = express.Router();
const db = require('../database/models');

router.get('/authors/:id/books', async (req, res) => {
    const authorId = req.params.id;
    
    const author = await db.Author.findByPk(authorId);
    const books = await db.Book.findAll({ where: { authorId } });

    res.render('authorBooks', { author, books });
});

module.exports = router;