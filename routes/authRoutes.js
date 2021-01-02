const express = require("express");
const router = new express.Router();
const authController = require("../controllers/authController");

// Account management list
router.get("/signup",  authController.account_getSignup);
//router.post("/signup", authController.account_postSignup);
router.get("/login",   authController.account_getLogin);
//router.post("/login",  authController.account_postLogin);
//router.post("/logout", authController.accout_logout); // GET ?

module.exports = router;