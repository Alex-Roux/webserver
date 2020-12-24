const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const routes = require("./routes/routes.js");
//const readline = require("readline");
const colors = require("colors");


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

// Log function
function log(string, formalized) {
	var date = "[" + new Date().toISOString().replace(/T/, " ").replace(/\..+/, "") + " GMT] ";
    if(!formalized) { date = ""; }
	var logLine = date.grey + string;
	console.log(logLine);
    const regex = new RegExp(/(\x1B\x5B39m|\x1B\x5B90m|\x1B\x5B36m|\x1B\x5B31m|\x1B\x5B32m|\x1B\x5B33m)/gmu); // angry-face
    logLine = logLine.replace(regex, "");
	fs.appendFile("latest.log", logLine + "\r\n", function (err) {if (err) { throw err; }});
}


//rl.prompt();


log("", 0);
log("Starting...".info, 1);


const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));


// create the express app
const app = express();


// register view engine
app.set("view engine", "ejs");
app.set("views", "htdocs");

// MongoDB
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    log("Connected to MongoDB.".success, 1);

    // listen for requests
    app.listen(3000);
    log("Listening.".info, 1);
});


// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Logger middleware
app.use((req, res, next) => {
    log("New request", 1);
    log("Hostname: ".info + req.hostname + "     URL : ".info + req.method + " " + req.url, 1);
    next();
});

app.use("/", routes);

// 404
app.use((req, res) => {
    log("█ Error code: 404 █".warn, 1);
    res.statusCode = 404;
    res.render("404", { title: "404" });
});

