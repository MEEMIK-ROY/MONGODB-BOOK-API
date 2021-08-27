const express = require('express');

const router = express.Router();

const publicationModel = require('../models/publicationmodel');

router.post('/', async(req,res) =>{
    const {
        publicationData
    } = req.body;

    try{
        const publication = await publicationModel.create(publicationData);
        res.json({
            data: publication,
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