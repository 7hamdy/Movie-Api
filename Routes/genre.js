const {Genre,validateGenre}=require('../Models/genre');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();


router.get('/', async(req,res)=>{
    const genre=await Genre.find();
    res.send(genre);
});

router.post('/',async (req,res)=>{

const {error}=validateGenre(req.body);
if(error)res.status(400).send(error.details[0].message);

const genre=new Genre({
    name:req.body.name
});
const result= await genre.save();
 res.send(result)

});

router.put('/:id',async (req,res)=>{
const {error}=validateGenre(req.body);
if(error)res.status(400).send(error.details[0].message);
    
const genre= await Genre.findByIdAndUpdate(req.params.id,{
    name:req.body.name
});
if(!genre)res.send('The Genre is Not Found');
res.send(genre);
});

router.delete('/:id',async(req,res)=>{
    const genre=await Genre.findOneAndDelete(req.params.id);
    if(!genre) res.status(400).send('The Movies Not Found');
    res.send(genre);
});
router.get('/:id',async(req,res)=>{
    const genre=await Genre.findById(req.params.id);
    if(!genre) res.status(400).send('The Movies Not Found');
    res.send(genre);
});
module.exports=router;