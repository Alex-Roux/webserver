const express = require("express");
const router = new express.Router();


// Root page
router.get("/", (req,res) => {
    res.render("index", { title: "Home"});
});

router.get("/page2", (req,res) => {
    res.render("page2", { title: "Page 2"});
});



module.exports = router;