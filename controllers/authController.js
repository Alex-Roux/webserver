const User = require("../models/user");




const errorHandler = (err) => {
    let error = { email: "", password: "" };

    if(err.message.includes("user validation failed:")) {
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties);
        });
    }
};



const account_getSignup = (req, res) => {
    res.render("auth/signup", { title: "Sign up"});
};

const account_postSignup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch(err) {
        const errors = errorHandler(err);
        res.status(400).send("error, user not created");
    }
};

const account_getLogin = (req, res) => {
    res.render("auth/login", { title: "Log in"});
};

const account_postLogin = async (req, res) => {
    
};

const account_logout = (req, res) => {
    //res.render("auth/page4", { title: "Page 2"});
}; // ?

module.exports = {
    account_getSignup,
    account_getLogin,
    account_postSignup,
    account_postLogin,
    account_logout
}