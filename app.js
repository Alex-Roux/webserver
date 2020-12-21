const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

// MongoDB
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("Connected to db.");
    app.listen(3001);
});


// create the express app
const app = express();


// register view engine
app.set('view engine', 'ejs');
app.set('views', 'htdocs');


// listen for requests
app.listen(3000);


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Logger middleware



// 404
app.use((req, res) => {
    res.render('404', { title: "404" });
});

