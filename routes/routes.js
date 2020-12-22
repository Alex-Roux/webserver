const express = require("express");
const router = new express.Router();


// Root page
router.get("/", (req,res) => {
    res.render("index", { title: "Home"});
});


module.exports = router;