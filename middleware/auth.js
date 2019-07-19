const jwt=require('jsonwebtoken');
const config=require('config');
const express =require('express');


module.exports = function(req,res,next){

    const token = req.header('x-jsonWebToken');
    
    if(!token){
        return res.status(401).send('No Token Provided !!');
    } 

    try{
   
        //2- User : Encoded => jwt.verify()
   const decoded=jwt.verify(token,config.get('jwtPrivateKey'));

   
   req.user=decoded;

   
   next();

    }catch(ex){
      return  res.status(400).send('Invalid Token !!');
    }

};