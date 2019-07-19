const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const {Rental,validateRental}=require('../Models/rental');
const {Movie}=require('../Models/movie');
const {Customer}=require('../Models/customer');

router.get('/',async(req,res)=>{
const rental=await Rental.find();
res.send(rental);
});

router.get('/:id',async(req,res)=>{
    const rental=await Rental.find(req.params.id);
    res.send(rental);
});
    
router.post('/',async(req,res)=>{

const {error}=validateRental(req.body);
if(error)res.status(400).send(error.details[0].message);

const movie=await Movie.findById(req.body.movieId);
if(!movie) res.status(404).send('Not Valid Movie');

const customer=await Customer.findById(req.body.customerId);
if(!movie) res.status(404).send('Not Valid Movie');

let rental=new Rental({
    movie:{
      _id:movie._id,
      title:movie.title,
      genre:movie.genre,
      numberInStock:movie.numberInStock,
      dailyRenatalRate:movie.dailyRenatalRate
    },
    customer:{
      _id:customer._id,
      name:customer.name,
      phone:customer.phone,
      isGold:customer.isGold
    },
    dateOut:req.body.dateOut,
    dateReturned:req.body.dateReturned,
    rentalfess:req.body.rentalfess


});

const result=await rental.save();
res.send(result);


});



module.exports= router;
