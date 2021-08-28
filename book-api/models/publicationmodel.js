const mongoose = require('mongoose');
var publicationSchema = mongoose.Schema({
    id:Number,
    name:String,
    contact_number:String,
    email_id:String,
    books_pub: Array,
    authors_assc: Array,
    address:String,
    year_of_estbn:Number,
    revenue:Number
});

const publication = mongoose.model("Publication", publicationSchema);

module.exports = publication