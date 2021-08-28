const authorModel = require('../models/authormodel');
const bookModel = require('../models/bookmodel');
const publicationModel = require('../models/publicationmodel');

const{
    CheckNull,
    validate_email,
    validateNumber,
    validateGender
} = require('../helpers/validationHelper');

const addBook = async(req,res) =>{
    const{
        bookData
    } = req.body;

    var error_msg =[];

    if(CheckNull(bookData.id)){
        error_msg.push('ID is invalid');
    }
    if(CheckNull(bookData.ISBN)){
        error_msg.push('ISBN is invalid')
    }
    if(CheckNull(bookData.name)){
        error_msg.push('Name is invalid');
    }
    if(CheckNull(bookData.author)){
        error_msg.push('Author is invalid');
    }
    if(CheckNull(bookData.no_of_pages)){
        error_msg.push('Number of pages is invalid');
    }
    if(CheckNull(bookData.price)){
        error_msg.push('Price is invalid');
    }

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

}

const getAllBooks = async(req,res) =>{
    try{
        const books = await bookModel.find({});
        res.json({
            data: books,
            message: "Successful"
        })
    }
    catch(error){
        res.json({
            data:[],
            message: "Error"
        })
    }
}

const getBooksFromISBN = async(req,res) =>{
    const {
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
}

const getBooksByCategory =  async(req,res) =>{
    
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
};

const getBooksByAuthorName =  async(req,res) =>{
    
    const{
        auth_name
    } = req.params;

    try{
        const pub_book = await authorModel.find({
            "name": auth_name
        },{"books":1,"_id":0});
        var pbook = pub_book[0].books;
        const books = await bookModel.find({
            "ISBN": {
                $in: pbook,
            }
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
}

module.exports = {
    addBook,
    getAllBooks,
    getBooksFromISBN,
    getBooksByCategory,
    getBooksByAuthorName
};