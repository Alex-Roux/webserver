const User = require("../models/user");




const errorHandler = (err) => {
    let error = { email: "", password: "" };

    if(err.message.includes("user validation failed:")) {
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties);
        });
    }
};



const accountGetSignup = (req, res) => {
    res.render("auth/signup", { title: "Sign up"});
};

const accountPostSignup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch(err) {
        const errors = errorHandler(err);
        res.status(400).send("error, user not created");
    }
};

const accountGetLogin = (req, res) => {
    res.render("auth/login", { title: "Log in"});
};

const accountPostLogin = async (req, res) => {
    
};

const accountLogout = (req, res) => {
    //res.render("auth/page4", { title: "Page 2"});
}; // ?

module.exports = {
    accountGetSignup,
    accountPostSignup,
    accountGetLogin,
    accountPostLogin,
    accountLogout
};