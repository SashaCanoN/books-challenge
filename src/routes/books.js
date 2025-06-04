router.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const book = await db.Book.findByPk(bookId);
    
    console.log("Usuario actual:", req.session.user); // Debug en la consola

    res.render('bookDetail', { book, user: req.session.user });
});
router.post('/books/search', async (req, res) => {
    const { title } = req.body;
    const books = await db.Book.findAll({
        where: { title: { [Op.like]: `%${title}%` } }
    });
    res.render('searchResults', { books });
});

router.post('/books/:id/delete', async (req, res) => {
    await db.Book.destroy({ where: { id: req.params.id } });
    res.redirect('/books');
});