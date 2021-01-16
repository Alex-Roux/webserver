const utils = require("../utils/utils");
const colors = require("colors");

// RequestLogger
// Logs informations about the request
const requestLogger = function(req, res, next) {
    let reqTime = new Date().getTime(); // Write down the time the request has been received at
    let reqUrl = req.url;
    let logString;              // Declare variables
    let isResource = false; 
    if(reqUrl.includes(".")) { // If the URL conatains a dot, that means it's a resource
        isResource = true;
        logString = "New request : ".grey + "Hostname: ".grey + req.hostname.grey + " ║ ".grey + "URL: ".grey + req.method.grey + req.url.grey;
    } else { // If not, that's a page
        logString = "New request : " + "Hostname: ".info + req.hostname + " ║ " + "URL: ".info + req.method + req.url;
    }
    if(utils.config.logResources || !isResource) {
        utils.log(logString, 1); // Call log function with the string
    }
    next(); // Continue

    res.on("finish", function() { // When the request is finished
        reqTime = new Date().getTime() - reqTime; // Calculate the time it took to process the request
        if(reqTime >= 250) { // If it's more than 250ms, log to the console.
            utils.log("Processed in ".grey + colors.green(reqTime) + " ms".grey, 1);
        }
    });
};

module.exports = requestLogger;