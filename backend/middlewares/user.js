const jwt = require('jsonwebtoken');
const { jwt_secret_user } = require('../config');

function userMiddlware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret_user);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = {
    userMiddlware,
};
