const hashPassword = require('../utils/hash')
const _ = require('lodash')
const express = require('express');
const { Animal, validate } = require('../models/animalSchema')
var router = express.Router();

//Getting all animals
const getAllAnimals= async function (req, res){
    const animals = await Animal.find().sort({ name: 1 });
    return res.send(animals)
};

// Getting an animal by name
const getAnimalByName= async function (req, res){
    const animals = await Animal.find({name:req.params.name});
    return res.send(animals)
};

// Adding a new animal
const addAnimal= async function (req, res){
    const {error} = validate(req.body)
    if (error) return res.send(error.details[0]
        .message).status(400)
    let animal = await Animal.findOne({ name: req.body.name })
    if (animal) return res.send({ error:'Animal already registered'}).status(400);
    animal = new Animal(_.pick(req.body,['name','role']))
    await animal.save()
    return res.send(animal).status(201)
};

//Updating animal info
    const updateAnimal=async function(req, res){
        Animal.findOneAndUpdate({name:req.body.name },req.body,{ new: true })
            .then(res.status(200).json({message:'Animal info updated'}))
            .catch(err => res.send(err).status(400));
    };

//Deleting an animal
const deleteANimal= async function(req,res){
    Animal.findByIdAndDelete({name:req.params.name})
    .then(res.status(200).json({message:'Animal deleted successfully!'}))
    .catch((err)=>{res.status(500).json(err)});
};

module.exports ={
    getAllAnimals,
    getAnimalByName,
    addAnimal,
    updateAnimal,
    deleteANimal
};