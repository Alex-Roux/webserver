const express = require("express");
const router = express.Router();


// Root page
router.get("/", (req,res) => {
    console.log("index");
    res.render("index", { title: "Home"});
});


module.exports = router;