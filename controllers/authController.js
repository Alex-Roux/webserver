const postSignup = require("./scripts/postSignup");
const postLogin = require("./scripts/postLogin");
const logout = require("./scripts/logout");

// Get the signup page
const accountGetSignup = (req, res) => {
    res.render("auth/signup", { title: "Sign up"});
};

// Create an account
const accountPostSignup = (req, res) => {
    postSignup(req, res);
};

// Get the login page
const accountGetLogin = (req, res) => {
    res.render("auth/login", { title: "Log in"});
};

// Logs the user in
const accountPostLogin = (req, res) => {
    postLogin(req, res);
};

// Logs the user out
const accountLogout = (req, res) => {
    logout(req, res);
};


module.exports = {
    accountGetSignup,
    accountPostSignup,
    accountGetLogin,
    accountPostLogin,
    accountLogout
};