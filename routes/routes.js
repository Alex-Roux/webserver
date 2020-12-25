const express = require("express");
const router = new express.Router();
const controller = require("../controllers/routeController");


router.get("/", controller.main_index);
router.get("/page2", controller.main_page2);


module.exports = router;