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
const url='mongodb://127.0.0.1:27017/rca-farm';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to mongodb successfully....'))
    .catch(err => console.log('failed to connect to mongodb', err));

//getting the port
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
});
