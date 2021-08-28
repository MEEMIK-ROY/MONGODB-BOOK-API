const mongoose = require('mongoose');
const dbConn = require('../database/db');

var bookSchema = mongoose.Schema({
    id:Number,
    ISBN:String,
    name:String,
    author:Array,
    publication: Array,
    language: String,
    ratings: Number,
    no_of_pages :Number,
    price:Number,
    category: Array
},{
    strict: false
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;