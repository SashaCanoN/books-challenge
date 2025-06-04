const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const { isAdmin, isLoggedIn } = require('../middlewares/authMiddleware');

router.get('/', bookController.home);

router.get('/books/:id', bookController.bookDetail);
router.post('/books/search', bookController.searchBooks);
router.get('/authors', bookController.authorsList);
router.get('/authors/:id/books', bookController.booksByAuthor);

router.get('/books/:id/edit', isAdmin, bookController.editForm);
router.put('/books/:id', isAdmin, bookController.updateBook);
router.delete('/books/:id', isAdmin, bookController.deleteBook);

router.get('/register', userController.registerForm);
router.post('/register', userController.registerUser);
router.get('/login', userController.loginForm);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

module.exports = router;
