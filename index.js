const config=require('config');
const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi=require('swagger-ui-express');
const swaggerDocument=require('./swagger.json');
const express=require('express');
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

if(!config.get('jwtPrivateKey')){
    console.log('The jwt private key is needed.')
    process.exit(1);
};

//connecting to mongodb
require('./models/mongodb');
//getting the port
const port=5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
});

//configuring routes
const animalRouter=require('./routes/animalRoutes');
const farmerRouter= require('./routes/farmerRoutes');
app.use(animalRouter);
app.use(farmerRouter);
app.get('/home',(req,res)=>{res.send('Welcome to our farm!')});