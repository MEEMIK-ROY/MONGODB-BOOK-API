const express = require('express');

const router = express.Router();

const authorModel = require('../models/authormodel');
const publicationModel = require('../models/publicationmodel');

/* REST API to POST an Author
    @route /author
    @description "POST author" 
    @method POST
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.post('/', async(req,res) =>{
    console.log(req);
    const {
        authorData
    } = req.body;

    /*const author = new authorModel(authorData);*/

    try{
        const author = await authorModel.create(authorData);
        res.json({
            data: author,
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

/* REST API to GET all authors
    @route /author
    @description "GET all authors" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.get('/', async (req,res) =>{
    

    try{
        const authors = await authorModel.find({});
        res.json({
            data: authors,
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

/* REST API to GET author based on author_name
    @route /author/:author_name
    @description "GET author based on author_name" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.get('/:author_name', async (req,res) =>{
    const {
        author_name
    } = req.params;

    try{
        const authors = await authorModel.find({
            "name": author_name
        });
        res.json({
            data: authors,
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

/* REST API to UPDATE author_name based on author_id
    @route /author/updatename
    @description "UPDATE author_name based on author_id" 
    @method PUT
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.put('/updatename', async (req,res) =>{
    const{
        author_id,
        author_name
    } = req.body;

    try{
        const authors = await authorModel.updateMany({
            "id": author_id
        }, {
            "name": author_name
        });
        res.json({
            data: authors,
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

/* REST API to DELETE author based on author_id
    @route /author/:author_id
    @description "DELETE author based on author_id" 
    @method DELETE
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.delete('/:author_id', async(req,res) =>{
    const{
        author_id
    } = req.params;

    try{
        const authors = await authorModel.deleteOne({
            "id": author_id
        });

        res.json({
            data: authors,
            message: "Succcessful"
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
})

/* REST API to DELETE all authors
    @route /author
    @description "DELETE all authors" 
    @method DELETE
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.delete('/', async(req,res) =>{


    try{
        const authors = await authorModel.deleteMany({});

        res.json({
            data: authors,
            message: "Succcessful"
        });
    }
    catch(error){
        res.json({
            data: [],
            message: "Error"
        });
    }
})

/* REST API to GET author based on book ISBN
    @route /author/book_id/:ISBN
    @description "GET author based on book ISBN" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/

router.get('/book_id/:ISBN', async (req,res) =>{
    const{
        ISBN
    } = req.params;

    try{
        const authors = await authorModel.find({
            "books": ISBN
        });
        res.json({
            data: authors,
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

/* REST API to GET author belonging to a publication
    @route /author/publication/:pub_name
    @description "GET author belonging to a publication" 
    @method GET
    @params -
    @return_type JSON object
    @content type application/JSON
*/
router.get('/publication/:pub_name', async (req,res) =>{
    const{
        pub_name
    } = req.params;

    try{
        const pub_book = await publicationModel.find({
            "name": pub_name
        }, {"books":1,"_id":0});
        
        const authors = await authorModel.find({
            "books": pub_book
        })
        res.json({
            data: authors,
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
module.exports = router;