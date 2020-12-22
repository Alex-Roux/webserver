const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const routes = require("./routes/routes.js");
const readline = require("readline");
const colors = require("colors");

function log(string, formalized) {
	var date = "[" + new Date().toISOString().replace(/T/, " ").replace(/\..+/, "") + " GMT] ";
    if(!formalized) date = "";
	var logLine = date.grey + string;
	console.log(logLine);
    const regex = new RegExp(/(\x1B\x5B39m|\x1B\x5B90m|\x1B\x5B36m|\x1B\x5B31m)/gmu); // angry-face
    logLine = logLine.replace(regex, "");
	fs.appendFile("latest.log", logLine + "\r\n", function (err) {if (err) throw err;});
}

// rl interface creation for command input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Color theme
colors.setTheme({
    info: "cyan",
    warn: "yellow",
    error: "red"
});

rl.prompt();
log("", 0);


/*// MongoDB
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"))

mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("Connected to db.");
    app.listen(3001);
});
*/

// create the express app
const app = express();


// register view engine
app.set("view engine", "ejs");
app.set("views", "htdocs");


// listen for requests
app.listen(3000);


// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Logger middleware
/*app.use((req, res, next) => {
    console.log("New request");
    //console.log("Hostname: " + req.hostname);
    console.log("" + req.method + " " + req.url);
    next();
});*/

app.use("/", routes);

// 404
app.use((req, res) => {
    res.render("404", { title: "404" });
});

