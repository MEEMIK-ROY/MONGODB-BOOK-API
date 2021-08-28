const authorModel = require('../models/authormodel');
const bookModel = require('../models/bookmodel');
const publicationModel = require('../models/publicationmodel');

const{
    CheckNull,
    validate_email,
    validateNumber,
    validateGender
} = require('../helpers/validationHelper');

const addPublication = async(req,res) =>{
    const {
        publicationData
    } = req.body;

    var error_msg = [];

    if(CheckNull(publicationData.id)){
        error_msg.push("ID is invalid");
    }
    if(CheckNull(publicationData.name)){
        error_msg.push("Name is invalid");
    }
    if(!validateNumber(publicationData.contact_number)){
        error_msg.push("Contact Number is invalid");
    }
    if(!validate_email(publicationData.email_id)){
        error_msg.push("Email_id is invalid");
    }
    if(CheckNull(publicationData.address)){
        error_msg.push("Address is invalid");
    }
    if(CheckNull(publicationData.year_of_estbn)){
        error_msg.push("Year of establishment is invalid");
    }
    if(CheckNull(publicationData.revenue)){
        error_msg.push("Revenue is invalid");
    }

    try{
        if(error_msg.length > 0){
            res.json({
                data: error_msg,
                message: "Invalid Data Passed"
            });
        }
        
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
        })
    }
}

const getAllPublications = async(req,res) =>{
    try{
        const publications = await publicationModel.find({});
        res.json({
            data: publications,
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

const getPublisherbyId = async(req,res) =>{
    const {
        publication_id
    } = req.params;

    try{
        const publications = await publicationModel.find({
            "id": publication_id
        }, '-_id -__v');
        res.json({
            data: publications,
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
    addPublication,
    getAllPublications,
    getPublisherbyId
}