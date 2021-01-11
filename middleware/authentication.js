const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token) {
        jwt.verify(token, utils.config.jwtSecret, (err, decodedToken) => {
            if(err) {
                utils.log("Invalid token.".warn, 1);
                res.status(403).redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        utils.log("User is not logged in.".grey, 1);
        res.status(403).redirect("/login");
    }
};

module.exports = requireAuth;