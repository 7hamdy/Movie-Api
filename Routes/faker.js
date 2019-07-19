const faker=require('faker');
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const  {Customer,validateCustomer}=require('../Models/customer');


router.post('/', async(req,res)=>{
for (let index = 0; index < 50; index++) {
    
       var customer= new Customer({
        name:faker.name.firstName() +' '+faker.name.lastName(),
        phone:faker.phone.phoneNumber(),
        isGold:faker.random.boolean()
      
        });
        
        customer=await customer.save();

}
res.send('Done........');

});

module.exports=router;