const express = require('express');

const router = express.Router();

const bookModel = require('../models/bookmodel');
const authorModel = require('../models/authormodel');

/* REST API to POST books 
    @route /books
    @description "POST book to db.books" 
    @method POST
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.post('/', async(req,res) =>{
    const {
        bookData
    } = req.body;

    try{
        const book = await bookModel.create(bookData);
        res.json({
            data: book,
            message: "Successful"
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
})

/* REST API to GET all books 
    @route /book
    @description "GET all books" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.get('/', async(req,res) =>{
    
    try{
        const books = await bookModel.find({});
        res.json({
            data: books,
            message: "Successful"
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
})

/* REST API to GET books based on ISBN
    @route /book/book_id/:ISBN
    @description "GET books based on ISBN" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.get('/book_id/:ISBN', async(req,res) =>{
    
    const{
        ISBN
    } = req.params;

    try{
        const books = await bookModel.find({
            "ISBN": ISBN
        });
        res.json({
            data: books,
            message: "Successful"
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
})

/* REST API to GET books based on category
    @route /book/category/:category
    @description "GET books based on category" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.get('/category/:category', async(req,res) =>{
    
    const{
        category
    } = req.params;

    try{
        const books = await bookModel.find({
            "category": category
        });

        res.json({
            data: books,
            message: "Successful"
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
})

/* REST API to GET books based on author_name
    @route /book/author_name/:auth_name
    @description "GET books based on category" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.get('/author_name/:auth_name', async(req,res) =>{
    
    const{
        auth_name
    } = req.params;

    try{
        const auth_id = await authorModel.find({
            "name": auth_name
        }, {
            "id":1, "_id":0
        });

        const books = await bookModel.find({
            "authors": auth_id
        });

        res.json({
            data: books,
            message: "Successful"
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
})

module.exports = router