const mongoose = require('mongoose');
const joi = require('joi'); //Object Schema Validation
joi.objectId = require('joi-objectid')(joi);
const {movieSchema} = require('./movie');
const {customerSchema} = require('./customer');


//1- Create Schema 

const rentalSchema = new mongoose.Schema({

    //customer
    customer: {
        type: customerSchema,
        required: true
    },
    //movie
    movie: {
        type: movieSchema,
        required: true
    },
    //dateout
    dateOut: {
        type: Date,
        default: Date.now()
    },
    //dateout returned
    dateReturned: {
        type: Date,
        required: true,
    },

    //rentalfess

    rentalfess: {
        type: Number,
        min: 0
    }

})


//2- Create Model To acsess Schema

const Rental = mongoose.model('Rental',rentalSchema);



// 3- Validate Customer >> by using joi (object schema validation)

function validateRental(rental) {
    const schema = {
        movieId: joi.objectId().required(),
        customerId: joi.objectId().required(),
        dateOut: joi.date(),
        dateReturned: joi.date().required(),
        rentalfess:joi.number().min(0)
    };
    return joi.validate(rental, schema);
}

//4- exports Function

exports.Rental = Rental;
exports.validateRental = validateRental;