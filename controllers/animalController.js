const hashPassword = require('../utils/hash')
const _ = require('lodash')
const express = require('express');
const { Animal, validate } = require('../models/animalSchema')
var router = express.Router();
router.get('/animals', async (req, res) => {
    const animals = await Animal.find().sort({ name: 1 });
    return res.send(animals)
});
router.get('/:name', async (req, res) => {
    const animals = await Animal.find({name:req.params.name});
    return res.send(animals)
});
router.post('/',async(req,res)=>{
    try{
    const {name,role}=req.body;
    const newAnimal= new Animal();
    newAnimal.name=name;
    newAnimal.role=role;
    await newAnimal.save();
    res.status(200).json({message:'new user saved!'});
    } catch (err) {
        res.status(500).json({message:'Internal server error'})
        console.log(err)
    }
})
router.post('/:name', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.send(error.details[0]
        .message).status(400)

    let animal = await Animal.findOne({ name: req.body.name })
    if (animal) return res.send({ error: 'Animal already registered' }).status(400);
    animal = new Animal(_.pick(req.body, ['name','classId']))
    await animal.save()
    return res.send(_.pick(animal, ['_id', 'name'])).status(201)
});
module.exports = router;