const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes.js");
const authRoutes = require("./routes/authRoutes.js");
const utils = require("./utils/utils.js");


// CLI command handler
/*utils.rl.on("line", (input) => {
    utils.rl.prompt();
});
utils.rl.prompt();*/

utils.log("Starting...".info, 1);



// Create the Express app
const app = express();

// Register view engine
app.set("view engine", "ejs");
app.set("views", "htdocs");

// MongoDB
mongoose.connect(utils.config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // Connect to the database
.then(() => {
    utils.log("Connected to MongoDB.".success, 1);
    app.listen(3000); // Listen for requests
    utils.log("Listening.".info, 1);
});

// Middlewares
app.use(utils.requestLogger);                       // Logger middleware
app.use(express.static("public"));                  // Give access to the public resources (images, stylesheets)
app.use(express.urlencoded({ extended: true }));    // urlencoded payloads
app.use(express.json());                            // Use express.json to handle requests
app.use(cookieParser());                            // Use cookie-parser to handle cookies

// Routing
app.use("/", routes);
app.use("/", authRoutes);

// Return a 404 page
app.use((req, res) => {
    utils.log("█ Error code: 404 : ".warn + req.method + " " + req.url, 1);
    res.statusCode = 404;
    res.render("404", { title: "404" });
});