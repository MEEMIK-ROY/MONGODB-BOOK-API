const express = require('express');

const router = express.Router();

const {
    addPublication,
    getAllPublications,
    getPublisherbyId
} = require('../controllers/publicationController')

router.post('/', addPublication);

router.get('/', getAllPublications);
router.get('/:publication_id', getPublisherbyId);

module.exports = router