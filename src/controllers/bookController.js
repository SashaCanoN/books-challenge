const Book = require('../models/Book');

async function bookDetail(req, res) {
  const book = await Book.findByPk(req.params.id, { include: ['author'] });
  if (!book) return res.status(404).send('Libro no encontrado');
  res.render('bookDetail', { book });
}

//post books search
async function searchBooks(req, res) {
  const { title } = req.body;
  if (!title.trim()) {
    return res.redirect('/books'); // evitar búsqueda vacía
  }
  const books = await Book.findAll({
    where: {
      title: { [Op.like]: `%${title}%` }
    }
  });
  res.render('search', { books, query: title });
}

//libros x autor
async function booksByAuthor(req, res) {
  const authorId = req.params.id;
  const books = await Book.findAll({ where: { authorId } });
  res.render('authorBooks', { books });
}

//editar libro
async function updateBook(req, res) {
  const { id } = req.params;
  const { title, authorId, ...otherFields } = req.body;
  await Book.update({ title, authorId }, { where: { id } });
  res.redirect(`/books/${id}`);
}

//eliminar libro
async function deleteBook(req, res) {
  const { id } = req.params;
  await Book.destroy({ where: { id } });
  res.redirect('/books');
}
