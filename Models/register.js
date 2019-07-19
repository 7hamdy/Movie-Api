const mongoose=require('mongoose');
const joi=require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');
const PasswordComplexity = require('joi-password-complexity')

const complexityOptions={
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
}

const RegisterSchema=new mongoose.Schema({

name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
},
email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255,
    lowercase:true
},
password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:1024
},
isAdmin:{
    type:Boolean,
    default:false
}

});

RegisterSchema.methods.generateJwt=function(){
const token =jwt.sign({_id:this.id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
//console.log({_id:this.id,email:this.email,name:this.name});
return token;
};

const Register=mongoose.model('Register',RegisterSchema);

function validate(user) {
    const schema = {
   name:joi.string().required().max(50).min(5),
   password:new PasswordComplexity(complexityOptions).required(),
   email:joi.string().required().max(255).min(5).email(),
   isAdmin:joi.boolean()    
}

return joi.validate(user,schema);
};

module.exports.Register=Register;
module.exports.validate=validate;