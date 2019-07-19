const mongoose = require('mongoose');
const express =require('express');
const router  =express.Router();
const _ =require('lodash');
const config=require('config');
const jwt=require('jsonwebtoken');


//1-
const bcrypt=require('bcrypt');

const { Register, validate } = require('../Models/register');


router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error)return res.send(error.details[0].message).status(404);

    let user = await Register.findOne({ email: req.body.email });
    if (user)return res.send('user Already exist !!').status(400);
   

    user = new Register(_.pick(req.body,['name','email','password','isAdmin']));
    
    // 2-
    const salt=await bcrypt.genSalt(10);
    
    //3-
    user.password=await bcrypt.hash(req.body.password, salt);

   // const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
    const token= user.generateJwt();
    await user.save();

    return res.header('x-jsonWebToken',token).send(_.pick(user,['id','name','email']));
});



module.exports=router;