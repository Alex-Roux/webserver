const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const authRoutes = require("./routes/authRoutes.js");
const utils = require("./utils/utils.js");
const cookieParser = require("cookie-parser");


// CLI command handler
/*utils.rl.on("line", (input) => {
    utils.rl.prompt();
});
utils.rl.prompt();*/

utils.log("Starting...".info, 1);

// Parse config.json
// Used to get the database URI
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// Create the Express app
const app = express();

// Register view engine
app.set("view engine", "ejs");
app.set("views", "htdocs");

// MongoDB
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // Connect to the database
.then(() => {
    utils.log("Connected to MongoDB.".success, 1);
    app.listen(3000); // Listen for requests
    utils.log("Listening.".info, 1);
});

app.use(cookieParser());
// Middlewares
app.use(utils.requestLogger);                       // Logger middleware
app.use(express.static("public"));                  // Give access to the public resources (images, stylesheets)
app.use(express.urlencoded({ extended: true }));    // urlencoded payloads
app.use(express.json());                            // Use express.json to handle requests

// Routing
app.use("/", routes);
app.use("/", authRoutes);

// Return a 404 page
app.use((req, res) => {
    utils.log("█ Error code: 404 : ".warn + req.method + " " + req.url, 1);
    res.statusCode = 404;
    res.render("404", { title: "404" });
});