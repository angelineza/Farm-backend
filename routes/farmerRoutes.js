const express=require('express');
const {createFarmer,getFarmers,getFarmerByName,deleteFarmer,updateFarmer,farmerLogin}=require('../controllers/farmerController');
const app= express.Router();

app.post('/farmer/signup',createFarmer);
app.get('/farmers',getFarmers);
app.get('/farmer/:name',getFarmerByName);
app.delete('farmer/delete/:id',deleteFarmer);
app.put('/farmer/update/:name',updateFarmer);
app.post('/farmer/login',farmerLogin);

module.exports=app;