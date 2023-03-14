const mongoose = require('mongoose');
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
var animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    },
    role:{
        type:String,
        required:true
    }
});
const Animal = mongoose.model('Items',itemsSchema);

function validate(animal){
    const schema = {
        name: Joi.string().max(255).min(3),
        role: Joi.string().max(255).min(3)
    }
    return Joi.validate(animal, schema)
}
module.exports={
    Animal,
    validate
}