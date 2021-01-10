const express = require("express");
const router = new express.Router();
const authController = require("../controllers/authController");

// Account management list
router.get( "/signup", authController.accountGetSignup);
router.post("/signup", authController.accountPostSignup);
router.get( "/login",  authController.accountGetLogin);
router.post("/login",  authController.accountPostLogin);
router.get( "/logout", authController.accountLogout); 

module.exports = router;