const express = require('express');

const router = express.Router();

const authorController = require('../controllers/authorController');

router.post('/', authorController.addAuthor); 

router.get('/', authorController.getAllAuthors);
router.get('/:author_id', authorController.getAuthorbyId); 
router.get('/:author_id/getBooks', authorController.getBooksbyAuthorID);
router.get('/book_ISBN/:book_ISBN', authorController.getAuthorByBookISBN);
router.get('/publication/:pub_name', authorController.getAuthorByPublisherName);

router.put('/updatename/:author_id',authorController.updateAuthorNamebyId);

router.delete('/:author_id', authorController.deleteAuthorbyId);
router.delete('/', authorController.deleteAllAuthors);


module.exports = router;