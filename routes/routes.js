const express = require("express");
const router = new express.Router();
const controller = require("../controllers/routeController");


router.get("/", controller.mainIndex);
router.get("/page2", controller.mainPage2);
router.get("/page3", controller.mainPage3);
router.get("/page4", controller.mainPage4);

module.exports = router;