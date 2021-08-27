const mongoose = require('mongoose');
const passcode = encodeURIComponent('RickRoy@2002')
const url = `mongodb+srv://MEEMIK_ROY:${passcode}@cluster0.8uzz4.mongodb.net/sample_database?retryWrites=true&w=majority`
mongoose.connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const dbConn = mongoose.connection;

dbConn.on("error" , console.error.bind(console, "Connection Error"));
dbConn.on("open", function(){
    console.log("DB Connection succesful");
})

module.exports = dbConn;