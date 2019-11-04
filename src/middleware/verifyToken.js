const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/config');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token)
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    const decoded = jwt.verify(token, jwtConfig.secret);
    console.log(decoded.id)
    req.userId = decoded.id;
    next();
}
module.exports = verifyToken;