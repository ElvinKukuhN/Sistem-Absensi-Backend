const jwt = require('jsonwebtoken');
const { errorResponse, defaultResponse } = require("../utils/responseHelper");

// Middleware for JWT Auth
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json(errorResponse('Access denied, no token provided', 401));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).errorResponse('Invalid token', 400);
    }
}

module.exports= authMiddleware