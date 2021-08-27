const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const db = require('./database/db');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const publicationRouter = require('./routes/publicationRouter')
const port = "8080";

app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use("/publication", publicationRouter);
app.listen(port,()=>{console.log(`listening at http://localhost: ${port}`)});