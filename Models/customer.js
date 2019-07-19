const mongoose=require('mongoose');
const joi = require('joi');//Object Schema Validation
var uniqueValidator = require('mongoose-unique-validator');


//1- Create Schema 

const customerSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    unique: true,
    minlength:5,
    maxlength:50
    
},

phone:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
},

isGold:{
    type:Boolean,
    required:true,
    default:false
}

});

// customerSchema.plugin(uniqueValidator);



//2- Create Model To acsess Schema

const Customer=mongoose.model('Customer',customerSchema);



// 3- Validate Customer >> by using joi (object schema validation)

function validateCustomer(customer) {
    const schema={
        name : joi.string().max(50).min(5).required(),
        phone : joi.string().max(50).min(5).required(),
        isGold: joi.boolean()
    };
    return joi.validate(customer,schema);
}

//4- exports Function

exports.Customer=Customer;
exports.customerSchema=customerSchema;
exports.validateCustomer=validateCustomer;
