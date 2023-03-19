const hashPassword = require('../utils/hash')
const _ = require('lodash')
const express = require('express');
const { Animal, validate, Farmer } = require('../models/farmerSchema');
const { func } = require('joi');

//Creating anew farmer account
const createFarmer= async function(req,res){
    const {error} = validate(req.body)
    if (error) return res.send(error.details[0]
        .message).status(400)
    let farmer = await Farmer.findOne({name:req.body.name})
    if (farmer) return res.send({ error: 'Farmer already registered' }).status(400);
    farmer = new Farmer(_.pick(req.body, ['name','email','password','isAdmin']))
    await farmer.save()
    return res.send(_.pick(farmer, ['_id', 'name'])).status(201)
};

//getting all farmers
const getFarmers= async function(req,res){
    const farmers = await Farmer.find();
    return res.send(farmers)
};

//getting a farmer by name
const getFarmerByName= async function(req,res){
    const farmers = await Farmer.find({name:req.params.name});
    return res.send(farmers)
};

//deleting a farmer account
const deleteFarmer= async function(req,res){
    Farmer.findOneAndDelete({name:req.params.name})
    .then((result)=>{
        console.log('Farmer account successfully deleted!')
        res.status(200).json(result);
    })
    .catch((err)=>{res.status(500).json(err)});
};

//updating a farmer account
const updateFarmer= async function(req,res){
    Farmer.findOneAndUpdate({name:req.params.name},req.body)
    .then((result)=>{
        console.log('Farmer account updated successfully!!')
        res.status(200).json(result);
    })
    .catch((err)=>{
        console.log(err)
        res.satus(500).json({message:'Internal server error'});
    });
};

// Logging in to a farmer account
const farmerLogin= async function(req,res){
    try {
        const {name,email,password,isAdmin}=req.body
        let farmer= await User.findOne({email:email})
        if(!farmer){
        return res.status(404).send('Invalid email or password')}
        let checkPassword= await bcrypt.compare(password,farmer.password)
        if(!checkPassword) return res.status(404).send('Invalid email or password')
        const token= farmer.giveToken();
        res.status(200).send(token)
       } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error')
       }
};

module.exports ={
    createFarmer,
    getFarmers,
    getFarmerByName,
    deleteFarmer,
    updateFarmer,
    farmerLogin
}