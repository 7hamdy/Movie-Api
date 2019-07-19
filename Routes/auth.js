const mongoose = require('mongoose');
const joi=require('joi');
const express =require('express');
const router  =express.Router();
const _ =require('lodash');
const bcrypt=require('bcrypt');
const {Register}=require('../Models/register');
const jwt=require('jsonwebtoken');
const config=require('config');

router.post('/', async (req,res)=>{
 
 const {error}= validate(req.body);
 if(error)return res.status(400).send(error.details[0].message);

const user=await Register.findOne({email:req.body.email});
if(!user) return res.status(400).send("Invalid Email or Password !! ");

const validPassword= await bcrypt.compare(req.body.password,user.password);
if(!validPassword) return res.status(400).send("Invalid Email or Password !! ");

// Send JWT 
const token=user.generateJwt();

return res.header('x-jsonWebToken',token).send('Done');

});


function validate(user) {
    const schema ={
     email:joi.string().required(),
     password:joi.string().required() 
    }
  return  joi.validate(user,schema);
};

module.exports=router;