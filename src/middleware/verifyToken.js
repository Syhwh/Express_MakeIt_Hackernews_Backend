const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/config');

function verifyToken(req, res, next) {
    const token = req.headers['Authorization'];
    if (!token) {
        return res.status(401).json({
            message: 'No token provider'
        });
    }
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.userId = decoded.id;
    next();
}
module.exports = verifyToken;