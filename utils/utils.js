const fs = require("fs");
const colors = require("colors");
const jwt = require("jsonwebtoken");
// const readline = require("readline");

// rl interface creation for command input

/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});*/

// Parse config.json
// Used to get the database URI
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// Set color theme
colors.setTheme({
    info: "cyan",
    success: "green",
    warn: "yellow",
    error: "red"
});
// Log function
// This function is used instead of console.log();
// as it also logs the string to latest.log
function log(string, includeDate) {
    var date;                                                                                                 // Define date
    if(includeDate) {
        date = colors.grey("[" + new Date().toISOString().replace(/T/, " ").replace(/\..+/, "") + " GMT] ");  // Include the date 
    }                                                                                                         // -> [2021-01-01 12:01:23 GMT] String
	string = date + string;                                                                                   // Add the date and the string together
	console.log(string);                                                                                      // Log the string to the console
    const regex = new RegExp(/(\x1B\x5B39m|\x1B\x5B90m|\x1B\x5B36m|\x1B\x5B31m|\x1B\x5B32m|\x1B\x5B33m)/gmu); // Define colors characters
    string = string.replace(regex, "");                                                                       // Remove colors characters from the string
	fs.appendFile("latest.log", string + "\r\n", function (err) {if (err) { throw err; }});                   // Append the string to latest.log
}

// RequestLogger
// Logs informations about the request
const requestLogger = function(req, res, next) {
    log("New request : " + "Hostname: ".info + req.hostname + " ║ " +"URL: ".info + req.method + req.url, 1); // Call log function with info
    next();
};

const databaseErrorHandler = function(err) {
    let errors = {errors: { email: "", password: "" }};
    if(err.code === 11000) {
        errors.errors.email = "That email address is already registered.";
        return errors;
    }
    if(err.message.includes("user validation failed:")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors.errors[properties.path] = properties.message;
        });
    }
    return errors;
};

const maxAge = 3 * 86400;
const createToken = function(id) {
    return jwt.sign({ id }, config.jwtSecret, { expiresIn: maxAge });
}

module.exports = {
    config,
    //rl,
    colors,
    log,
    requestLogger,
    databaseErrorHandler,
    maxAge,
    createToken
};