const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// If a page needs to be authenticated
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt; // Get the JWT token
    
    if(token) { // If the user is logged in
        jwt.verify(token, utils.config.jwtSecret, (err) => { // Check if the token is valid
            if(err) {
                // If it's invalid, delete the JWT cookie and redirect the user to /login with code 403 Forbidden
                utils.log("Invalid token. ".warn, 1);
                res.cookie("jwt", "", { maxAge: 10 });
                res.status(403).redirect("/login");
            } else { 
                // If it's valid, continue
                next();
            }
        });
    } else {
        // If the user is not logged in, redirect him to /login with code 403 Forbidden
        utils.log("User is not logged in, redirecting him to /login...".grey, 1);
        res.status(403).redirect("/login");
    }
};

// Get an user object based on the JWT cookie provided in the request
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt; // Get the JWT token
    
    if(token) { // If the user is logged in
        jwt.verify(token, utils.config.jwtSecret, async (err, decodedToken) => { // Check if the token is valid
            if(err) {
                // If it's invalid,
                // delete the JWT cookie and redirect the user to /login with code 403 Forbidden
                // and return a null value
                utils.log("Invalid token. ".warn, 1);
                res.cookie("jwt", "", { maxAge: 10 });
                res.locals.user = null;
                next();
            } else {
                // If it's valid, look in the database for this user
                // and return the user object
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        // If the user is not logged in, return a null value
        res.locals.user = null;
        next();
    }
};

module.exports = {
    requireAuth,
    checkUser
};