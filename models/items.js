const mongoose = require('mongoose');
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
var itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    },
    role: {
        type:String,
        required:true
    }
});
// itemsSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign(
//         {
//             _id: this._id, name: this.name, email: this.email,
//             isAdmin: this.isAdmin
//         }
//         , config.get('jwtPrivateKey'))
//     return token
// }
const Items = mongoose.model('Items',itemsSchema);
function validate(item){
    const schema = {
        name: Joi.string().max(255).min(3),
    }
    return Joi.validate(item, schema)
}
// module.exports.Items = Items
// module.exports.validate = validate