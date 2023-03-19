const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token=req.header('Authorization');
    if (!token) return res.send({ error: 'token is missing..' }).status(401)
    try {
        const decoded =
            jwt.verify(token.split('Bearer ')[1], config.get('jwtPrivateKey'))
        //add user to the request body
        req.user = decoded
        next()
    } catch (err) {
        return res.send('invalid token').status(400)
    }
}
module.exports = auth;