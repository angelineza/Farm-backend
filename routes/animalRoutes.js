const express=require('express');
const{getAllAnimals,getAnimalByName, addAnimal,updateAnimal,deleteANimal}=require('../controllers/animalController');
const router= express.Router();

router.post('/animal/sadd',addAnimal);
router.get('/animals',getAllAnimals);
router.get('/animal/:name',getAnimalByName);
router.delete('animal/delete/:name',deleteANimal);
router.put('/animal/update/:name',updateAnimal);

module.exports=router;