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
    let regex = new RegExp(/(\x1B\x5B39m|\x1B\x5B90m|\x1B\x5B36m|\x1B\x5B31m|\x1B\x5B32m|\x1B\x5B33m)/gmu); // Define colors characters
    string = string.replace(regex, "");                                                                       // Remove colors characters from the string
	fs.appendFile("latest.log", string + "\r\n", function (err) {if (err) { throw err; }});                   // Append the string to latest.log
}

const refreshConfig = function() {                                  // COMBAK
    config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
    log("Refreshed config.".success, 1);
};

// Set color theme
colors.setTheme({
    info: "cyan",
    success: "green",
    warn: "yellow",
    error: "red"
});

// CLI command handler
rl.setPrompt("");
rl.on("line", (input) => {
    if(input === "quit" || input === "exit") {
        log("Exiting...".warn, 1);
        /*server.close(() => {
            process.exit(0);
        });*/
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
rl.prompt();

const databaseErrorHandler = function(err) {
    let errors = { errors: { email: "", password: "" }};
    if(err.message === "auth err") {
        errors.errors.password = "Incorrect email address or password.";
        return errors;
    }
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

const createToken = function(id) {
    return jwt.sign({ id }, config.jwtSecret, { expiresIn: maxAge });
};

module.exports = {
    config,
    colors,
    server,
    maxAge,
    log,
    databaseErrorHandler,
    createToken
};