const fs = require("fs");
const colors = require("colors");
// const readline = require("readline");

// rl interface creation for command input

/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});*/


// Color theme
colors.setTheme({
    info: "cyan",
    success: "green",
    warn: "yellow",
    error: "red"
});

// log function
function log(string, formalized) {
	var date = "[" + new Date().toISOString().replace(/T/, " ").replace(/\..+/, "") + " GMT] ";
    if(!formalized) { date = ""; }
	var logLine = date.grey + string;
	console.log(logLine);
    const regex = new RegExp(/(\x1B\x5B39m|\x1B\x5B90m|\x1B\x5B36m|\x1B\x5B31m|\x1B\x5B32m|\x1B\x5B33m)/gmu); // angry-face
    logLine = logLine.replace(regex, "");
	fs.appendFile("latest.log", logLine + "\r\n", function (err) {if (err) { throw err; }});
}

//
const logRequest = function(req, res, next) {
    log("New request : " + "Hostname: ".info + req.hostname + " ║ " +"URL: ".info + req.method + req.url, 1);
    next();
}

module.exports = {
    //rl,
    colors,
    log,
    logRequest
};