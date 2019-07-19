const mongoose=require('mongoose');
const express =require('express');
const router  =express.Router();
const {Customer,validateCustomer}=require('../Models/customer');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');


router.get('/',[auth,admin],async (req,res)=>{

    const customers= await Customer.find().sort('name');
  return  res.send(customers);

});

router.post('/', async (req,res) =>{

  // Validate Object 
  const {error} = validateCustomer(req.body);
  if(error)res.status(400).send(error.details[0].message);
  
 let findCustomer=Customer.findOne({name:req.body.name});
 if(findCustomer) return res.status(404).send('The Name Is Dublicate');

  //Save Object

  let customer= new Customer({
  name:req.body.name,
  phone:req.body.phone,
  isGold:req.body.isGold

  });
  customer=await customer.save();
  res.send(customer);
  
});

router.put('/:id',async (req,res)=>{

  const {error} = validateCustomer(req.body);
  if(error)res.status(400).send(error.details[0].message);

  const customerId=await Customer.findById(req.params.id);
  if(!customerId) return res.status(404).send('Not Found');
  
  const customerName=await Customer.findOne({name:req.body.name});
  if(customerName) return res.status(404).send('The Name Is Dublicate..');

  const customer=await Customer.updateOne({_id:req.params.id},{
     name:req.body.name,
      phone:req.body.phone,
      isGold:req.body.isGold
  });

  res.send(customer);
  
});
        
router.delete('/:id',async(req,res)=>{
  const {error}=validateCustomer(req.body);
  if(error)res.status(400).send(error.details[0].message);
 
  const customer=await Customer.findByIdAndRemove(req.params.id);

  if(!customer)res.status(400).send('Not Found');

  res.send(customer);

});


router.get('/:id',async(req,res)=> {
  const {error}=validateCustomer(req.body);
  if(error)res.status(400).send(error.details[0].message);
 
  const customer=await Customer.findById(req.params.id);

  if(!customer)res.status(400).send('Not Found');

  res.send(customer);

})

module.exports=router;
