const User = require("../models/user");
const utils = require("../utils/utils.js");

// Get the signup page
const accountGetSignup = (req, res) => {
    res.render("auth/signup", { title: "Sign up"});
};

// Create an account
const accountPostSignup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch(err) {
        const errors = errorHandler(err);
        res.status(400).json(errors);
    }
};

// Get the login page
const accountGetLogin = (req, res) => {
    res.render("auth/login", { title: "Log in"});
};

// Logs the user in
const accountPostLogin = async (req, res) => {
    res.render("index", { title: "Home"});
};

// Logs the user out
const accountLogout = (req, res) => {
    res.render("index", { title: "Home"});
};


module.exports = {
    accountGetSignup,
    accountPostSignup,
    accountGetLogin,
    accountPostLogin,
    accountLogout
};