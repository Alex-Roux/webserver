const utils = require("../utils/utils");

const firewall = function(req, res, next) {
    if(utils.config.blockedIP.includes(req.hostname)) {
        utils.log("Blocked by firewall".warn, 1);
        res.status(403).send("403 Forbidden");
    } else{
        if(!utils.config.allowedIP.includes(req.hostname) && utils.config.whitelist) {
            utils.log("Blocked by firewall".warn, 1);
            res.status(403).send("403 Forbidden");
        } else{
            next();
        }
    }
};

module.exports = firewall;