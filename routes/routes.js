const express = require("express");
const router = new express.Router();
const controller = require("../controllers/routeController");


router.get("/", controller.mainIndex);
router.get("/page2", controller.mainPage2);


module.exports = router;