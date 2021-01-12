const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token) {
        jwt.verify(token, utils.config.jwtSecret, (err) => {
            if(err) {
                utils.log("Invalid token. ".warn, 1);
                res.status(403).redirect("/login");
            } else {
                next();
            }
        });
    } else {
        utils.log("User is not logged in, redirecting him to /login...".grey, 1);
        res.status(403).redirect("/login");
    }
};

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token) {
        jwt.verify(token, utils.config.jwtSecret, async (err, decodedToken) => {
            if(err) {
                utils.log("Invalid token. ".warn, 1);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {
    requireAuth,
    checkUser
};