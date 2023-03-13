require('./models/mongodb')
const animalController = require('./controllers/animalController');
const authMiddleware = require('./middleware/auth')
const config = require('config')
const admin = require('./middleware/admin')
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
if (!config.get("jwtPrivateKey")) {
    console.log('JWT PRIVATE KEY IS NOT DEFINED')
    process.exit(1)
}
app.get('/', (req, res) => {
    res.send('Welcome to our app');
});
// app.use('/v1/api/animalClasses', [authMiddleware, admin], animalClassController);
// app.use('/v1/api/animals', [authMiddleware, admin], animalController);
app.use('/v1/api/animals',animalController);
// app.use('/v1/api/users', userController)
// app.use('/v1/api/auth', auth)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));