const fs = require("fs");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });

var server;
const maxAge = 3 * 86400; // jwt cookie maxAge

// Parse config.json
var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// Log function
// This function is used instead of console.log();
// as it also logs the string to latest.log
function log(string, includeDate) {
    let date;                                                                                                 // Define date
    if(includeDate) {
        date = colors.grey("[" + new Date().toISOString().replace(/T/, " ").replace(/\..+/, "") + " GMT] ");  // Include the date 
    }                                                                                                         // -> [2021-01-01 12:01:23 GMT] String
	string = date + string;                                                                                   // Add the date and the string together
	console.log(string);                                                                                      // Log the string to the console
    let regex = new RegExp(/(\x1B\x5B39m|\x1B\x5B90m|\x1B\x5B36m|\x1B\x5B31m|\x1B\x5B32m|\x1B\x5B33m)/gmu);   // Define colors characters
    string = string.replace(regex, "");                                                                       // Remove colors characters from the string
	fs.appendFile("latest.log", string + "\r\n", function (err) {if (err) { throw err; }});                   // Append the string to latest.log
}

const refreshConfig = function() {                                  // COMBAK
    config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
    log("Refreshed config.".success, 1);
};

// Set the color theme
colors.setTheme({
    info: "cyan",       // Usage :
    success: "green",   // foo.info -> will be cyan in the console
    warn: "yellow",     // colors.warn(foo) -> will be yellow in the console
    error: "red"
});

// CLI command handler
// Use rl to simulate a command prompt
rl.setPrompt(""); // Reset the prompt (default: >)
rl.on("line", (input) => { // When a line is sent to rl (by pressing enter)
    if(input === "quit" || input === "exit") { // I realised that I don't really have to comment every command,
        log("Exiting...".warn, 1);             // they all seem straightforward enough
        process.exit(0); // COMBAK: not that "graceful" yet
    } else if(input === "kill") {
        process.exit(1);
    } else if(input === "refreshconfig") {
        refreshConfig();
    } else if(input === "help") {
        log("List of commands:".info, 1);
        log("- quit/exit", 1);
        log("- kill", 1);
        log("- refreshconfig", 1);
        // log("- ", 1);
        // log("- ", 1);
    } else {
        log(input.warn + ": Undefined command.".warn, 1);
    }
    rl.prompt();
});
rl.prompt(); // First prompt

// Handles errors coming from the database (login, signup etc)
const databaseErrorHandler = function(err) {
    let errors = { errors: { email: "", password: "" }};
    if(err.message === "auth err") { // (login) If the entered credentials are incorrect
        errors.errors.password = "Incorrect email address or password.";
        return errors;
    }
    if(err.code === 11000) { // (signup) Error code coming from MongoDB (mongoose) -> duplicate email address
        errors.errors.email = "That email address is already registered.";
        return errors;
    }
    if(err.message.includes("user validation failed:")) { // (validate): IF the validation failed
        Object.values(err.errors).forEach(({properties}) => {
            errors.errors[properties.path] = properties.message;
        });
    }
    return errors;
};

// Create a JWT token using the user id
const createToken = function(id) {
    return jwt.sign({ id }, config.jwtSecret, { expiresIn: maxAge });
};

// Export everything
module.exports = {
    config,
    colors,
    server,
    maxAge,
    log,
    databaseErrorHandler,
    createToken
};