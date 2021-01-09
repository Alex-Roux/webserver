const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const authRoutes = require("./routes/authRoutes.js");
const utils = require("./utils/utils.js");
const cookieParser = require("cookie-parser");

/*utils.rl.on("line", (input) => {
    utils.rl.prompt();
});
utils.rl.prompt();*/

utils.log("", 0);
utils.log("Starting...".info, 1);


const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));


// create the express app
const app = express();


// register view engine
app.set("view engine", "ejs");
app.set("views", "htdocs");

// MongoDB
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
    utils.log("Connected to MongoDB.".success, 1);

    // listen for requests
    app.listen(3000);
    utils.log("Listening.".info, 1);
});


// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Logger middleware
app.use(utils.logRequest);                          // Logger middleware

// Routing
app.use("/", routes);
app.use("/", authRoutes);

// 404 page
app.use((req, res) => {
    utils.log("█ Error code: 404 : ".warn + req.method + " " + req.url, 1);
    res.statusCode = 404;
    res.render("404", { title: "404" });
});

