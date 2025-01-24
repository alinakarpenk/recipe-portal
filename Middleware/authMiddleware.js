const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken
    console.log('Token:', token); 
    if (token) {
        jwt.verify(token, '123456', (err, user) => {
            if (err) {
                res.locals.isAuthenticated = false;
                return next(); 
            }
            req.user = user; 
            res.locals.isAuthenticated = true;
            res.locals.user = user;
            next();
        });
    } else {
        res.locals.isAuthenticated = false;
        next();
    }
};



module.exports = authenticateToken;
