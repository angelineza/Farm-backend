const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/farm',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to mongodb successfully....'))
    .catch(err => console.log('failed to connect to mongodb', err));
    require('../models/animalSchema');
    require('../models/farmerSchema');