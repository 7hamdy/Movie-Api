const mongoose=require('mongoose');
const joi = require('joi');//Object Schema Validation
joi.objectId = require('joi-objectid')(joi);

const {genreSchema}=require('./genre');

//1- Create Schema 

const movieSchema=new mongoose.Schema({

title:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255,
    trim:true
},
  genre:{
      type:genreSchema,
      required:true
  },
  numberInStock:{
    type:Number,
    required:true,
    min:0,
    max:255
  },
  dailyRenatalRate :{
      type:Number,
      required:true,
      min:0,
      max:255
  }




})


//2- Create Model To acsess Schema

const Movie=mongoose.model('Movie',movieSchema);



// 3- Validate Customer >> by using joi (object schema validation)

function validateMovie(movie) {
    const schema={
        title : joi.string().max(255).min(5).required().trim(),
        genreId:joi.objectId().required(),
        genrename:joi.string(),
        numberInStock : joi.number().required().min(0).max(255),
        dailyRenatalRate: joi.number().required().min(0).max(255),
    };
    return joi.validate(movie,schema);
}

//4- exports Function

exports.Movie=Movie;
exports.movieSchema=movieSchema;
exports.validateMovie=validateMovie;