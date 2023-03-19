const express=require('express');
const {createFarmer,getFarmers,getFarmerByName,deleteFarmer,updateFarmer,farmerLogin}=require('../controllers/farmerController');
const router= express.Router();

router.post('/farmer/signup',createFarmer);
router.get('/farmers',getFarmers);
router.get('/farmer/:name',getFarmerByName);
router.delete('farmer/delete/:id',deleteFarmer);
router.put('/farmer/update/:name',updateFarmer);
router.post('/farmer/login',farmerLogin);

module.exports=router;