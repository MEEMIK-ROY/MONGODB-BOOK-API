const mongoose = require('mongoose');
var publicationSchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        require: true
    },
    books: Array,
},{
    strict: false
});

const publication = mongoose.model("Publication", publicationSchema);

module.exports = publication