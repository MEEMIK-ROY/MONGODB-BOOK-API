const mongoose = require('mongoose');
const dbConn = require('../database/db');

var bookSchema = mongoose.Schema({
    ISBN: String,
    title: {
        type: String,
        require: true
    },
    authors: Array,
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: Array,
    publication: Number,
},{
    strict: false
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;