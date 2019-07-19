const joi=require('joi');
joi.objectId=require('joi-objectid')(joi);
const mongoose=require('mongoose');
const express=require('express');
const config=require('config');
const app=express();
const customer=require('./Routes/customer');
const movie=require('./Routes/movie');
const genre=require('./Routes/genre');
const rental=require('./Routes/rental');
const faker=require('./Routes/faker');
const register=require('./Routes/register');
const auth=require('./Routes/auth');


app.use(express.json());


app.use('/api/customer',customer);
app.use('/api/movie',movie);
app.use('/api/genre',genre);
app.use('/api/rental',rental);
app.use('/api/faker',faker);
app.use('/api/register',register);
app.use('/api/auth',auth);

mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true,useCreateIndex:true,useFindAndModify:false})
.then(()=>console.log('DataBase is Connected'))
.catch(()=>console.log('DataBase is failed'));

if(!config.get('jwtPrivateKey')){
console.log('FATA ERRR : JWTPRIVATE KEY IS Not set');
process.exit(1); //closed Error...
};




const port=process.env.PORT || 2000;
app.listen(port,()=>console.log(`listen in port ${port}`));


