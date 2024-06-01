const jwt = require('jsonwebtoken');

const jwtTokenVerify = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRETE, (err, decode) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        global.CLIENT_ID = decode.clientId;
        next();
    });
};

module.exports = jwtTokenVerify;