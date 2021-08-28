const express = require('express');

const router = express.Router();

const{
    addBook,
    getAllBooks,
    getBooksFromISBN,
    getBooksByCategory,
    getBooksByAuthorName
} = require('../controllers/bookController');


router.post('/', addBook);

router.get('/', getAllBooks);
router.get('/book_ISBN/:ISBN', getBooksFromISBN);
router.get('/category/:category', getBooksByCategory);
router.get('/author_name/:auth_name', getBooksByAuthorName);

module.exports = router