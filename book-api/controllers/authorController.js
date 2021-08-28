const authorModel = require('../models/authormodel');
const bookModel = require('../models/bookmodel');
const publicationModel = require('../models/publicationmodel');

const{
    CheckNull,
    validate_email,
    validateNumber,
    validateGender
} = require('../helpers/validationHelper');

const addAuthor = async(req,res) =>{
    const {
        authorData
    } = req.body;

    var error_msg = [];

    if(CheckNull(authorData.id)){
        error_msg.push("ID is invalid");
    }
    if(CheckNull(authorData.name)){
        error_msg.push("Name is invalid");
    }
    if(CheckNull(authorData.age)){
        error_msg.push("Age is invalid");
    }
    if(CheckNull(authorData.country)){
        error_msg.push("Country is invalid");
    }
    if(!validate_email(authorData.email_id)){
        error_msg.push("Email id is invalid");
    }
    if(!validateNumber(authorData.contact_number)){
        error_msg.push("Contact Number is invalid");
    }
    if(!validateGender(authorData.gender)){
        error_msg.push("Gender is invalid");
    }

    try{
        if(error_msg.length > 0){
            res.json({
                data: error_msg,
                message: "Invalid Data Passed"
            });
        }
        
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
        })
    }
}

const getAllAuthors = async(req,res) =>{
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
}

const getAuthorbyId = async(req,res) =>{
    const {
        author_id
    } = req.params;

    try{
        const authors = await authorModel.find({
            "id": author_id
        }, '-_id -__v');
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
}

const getBooksbyAuthorID = async(req,res) =>{
    const {
        author_id
    } = req.params;

    try{
        const pub_books = await authorModel.find({
            "id": author_id
        },{"books":1,"_id":0});
        var pbook = pub_books[0].books;

        const books = await bookModel.find({
            "ISBN": {
                $in: pbook
            }
        })
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
}

const getAuthorByBookISBN = async(req,res) =>{
    const {
        book_ISBN
    } = req.params;

    try{
        const authors = await authorModel.find({
            "books": book_ISBN
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
}

const getAuthorByPublisherName = async (req,res) =>{
    const{
        pub_name
    } = req.params;

    try{
        const pub_id = await publicationModel.find({
            "name": pub_name
        }, {"id":1,"_id":0});
        var p_id = JSON.stringify(pub_id[0].id);
        const authors = await authorModel.find({
            "publisher_assc":{
                $in: p_id
            }
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
}

const updateAuthorNamebyId = async(req,res) =>{
    const {
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
}

const deleteAuthorbyId = async(req,res) =>{
    const {
        author_id
    } = req.params;

    try{
        const authors = await authorModel.deleteOne({
            "id": author_id
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
}

const deleteAllAuthors = async(req,res) =>{
    try{
        const authors = await authorModel.deleteMany({});
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
}

module.exports = {
    addAuthor,
    getAllAuthors,
    getAuthorbyId,
    getBooksbyAuthorID,
    getAuthorByBookISBN,
    getAuthorByPublisherName,
    updateAuthorNamebyId,
    deleteAuthorbyId,
    deleteAllAuthors
}