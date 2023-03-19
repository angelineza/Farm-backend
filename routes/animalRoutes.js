const express=require('express');
const{getAllAnimals,getAnimalByName, addAnimal,updateAnimal,deleteAnimal}=require('../controllers/animalController');
const app= express.Router();

app.post('/animal/add',addAnimal);
app.get('/animals',getAllAnimals);
app.get('/animal/:name',getAnimalByName);
app.delete('animal/delete/:name',deleteAnimal);
app.put('/animal/update/:name',updateAnimal);

module.exports=app;