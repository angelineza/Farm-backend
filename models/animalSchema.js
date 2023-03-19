const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
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

const Animal = mongoose.model('animals',animalSchema);

module.exports={
    Animal
}