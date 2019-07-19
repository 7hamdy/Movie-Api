const {Movie,validateMovie}=require('../Models/movie')
const {Genre,genreSchema}=require('../Models/genre')
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/' , async (req,res)=>{
    const movies=await Movie.find();
    res.send(movies);
});


router.post('/',async (req,res)=>{
    const {error} =validateMovie(req.body);
    if(error)res.status(400).send(error.details[0].message);
    
const genre=await Genre.findById(req.body.genreId);
if(!genre) res.status(400).send('Invalid Genre');

const movie=new Movie({
    title:req.body.title,
   
  genre:{
      _id:genre._id,
      name:genre.name
  },
  numberInStock: req.body.numberInStock,
  dailyRenatalRate : req.body.dailyRenatalRate  
});

const result =await movie.save();
res.send(result);

});

router.put('/:id',async (req,res)=>{

const {error}=validateMovie(req.body);
if(error)res.status(400).send(error.details[0].message);

const genre=await Genre.findById(req.body.genreId);
if(!genre)res.status(400).send('Invalid Genre');

const movie=await Movie.findByIdAndUpdate(req.params.id,{
    title:req.body.title,
    genre:{
        _id:genre._id,
        name :  req.body.genrename,
    },
     numberInStock:req.body.numberInStock,
    dailyRenatalRate:req.body.dailyRenatalRate 
});

if(!movie) res.status(404).send('The Movie Not Found');
res.send(movie);


});

router.delete('/:id', async(req,res)=>{
    const movie=await Movie.findOneAndDelete({_id:req.params.id});
    if(!movie) res.status(400).send('The Movies Not Found');
    res.send(movie);
});


router.get('/:id',async (req,res)=>{
    const movie=await Movie.findById(req.params.id);
    if(!movie) res.status(400).send('The Movies Not Found');
    res.send(movie);
});

/* Remove Data In Sub-Document

router.delete('/:id',async(req,res)=>{
const movies=await Movie.findByIdAndUpdate(req.params.id,{
    $unset:{
    'genre._id':''

    }
});



res.send(movies);
    
}

);
*/

module.exports=router;

