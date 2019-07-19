const mongoose=require('mongoose');
const joi = require('joi');//1-Create Schema 
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
        minlength:5,
    }
})

//2-Create Model
const Genre=mongoose.model('Genre',genreSchema);

//3-Validate Genre 

function validateGenre(genre) {
    const Schema={
        name:joi.string().required().max(50).min(5)
    }

    return joi.validate(genre,Schema);
}

//4- exports Function

exports.Genre=Genre;
exports.genreSchema=genreSchema;
exports.validateGenre=validateGenre;