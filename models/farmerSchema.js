const mongoose = require('mongoose');
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config');
const { boolean } = require('joi');
var farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:boolean,
        required:true
    }
});

farmerSchema.pre('save', async function(next){
    const salt=await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
    next()
 });

const giveToken=farmerSchema.methods.generateAuthToken=function () {
    const token = jwt.sign(
        {
            _id: this._id, name: this.name, email: this.email,
            isAdmin: this.isAdmin
        }
        , config.get('jwtPrivateKey'))
    return token
};

const Farmer = mongoose.model('Farmers',farmerSchema);

const validate= function(farmer){
    const schema = {
        name: Joi.string().max(255).min(3),
        email: Joi.string().max(255).min(3),
        role: Joi.string().max(255).min(3),
        isAdmin: Joi.boolean().required()
    }
    return Joi.validate(item, schema)
}
module.exports= {
    Farmer,
    validate,
    giveToken
}


// {
//     "name": "auth",
//     "description": "Auth apis"
// }, in swagger.json line 27