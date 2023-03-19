// const { boolean } = require('joi');
// const Joi= require('joi');

//     const animalValidation=Joi.object({
//         name:String().max(255).min(3).required(),
//         role:String().max(255).min(3).required()
//     });

//     const farmerValidation=Joi.object({
//         name:String().max(255).min(3).required(),
//         email:email().required(),
//         password:String().required(),
//         isAdmin:boolean().required()
//     });

//     const validateAnimal= async function(req,res,next){
//         const animal={
//             name:req.body.name,
//             role:req.body.password
//         };
//         const {error}=animalValidation.validate(animal);
//         if(error){
//             console.log(error);
//             res.status(404).json({err:'there was an error'});
//         }else{
//             next();
//         }
//     };

//     const validateFarmer= async function(req,res,next){
//         const farmer={
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password,
//             isAdmin:req.body.isAdmin
//         };
//         const {error}=farmerValidation.validate(farmer);
//         if(error){
//             console.log(error);
//             res.status(404).json({err:'there was an error'});
//         }else{
//             next();
//         }
//     };
    
// module.exports={
//     validateAnimal,
//     validateFarmer
// }