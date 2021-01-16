const utils = require("../utils/utils");

// Check if the hostname is allowed
// This function does NOT include a VPN blocker
const firewall = function(req, res, next) {
    if(utils.config.blockedIP.includes(req.hostname)) {
        // If the user is on the blocked IPs list,
        // return "403 Forbidden"
        utils.log("Blocked by firewall".warn, 1);
        res.status(403).send("403 Forbidden");
    } else{
        if(!utils.config.allowedIP.includes(req.hostname) && utils.config.whitelist) {
            // If the whitelist is activated and
            // the hostname is not on the allowed IPs list
            // return "403 Forbidden"
            utils.log("Blocked by firewall".warn, 1);
            res.status(403).send("403 Forbidden");
        } else{
            // Otherwise, process the request as usual
            next();
        }
    }
};

module.exports = firewall;