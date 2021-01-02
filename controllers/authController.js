const account_getSignup = (req, res) => {
    res.render("auth/signup", { title: "Sign up"});
};

const account_postSignup = (req, res) => {
    //res.render("auth/page4", { title: "Page 2"});
    res.send('new user created.');
};

const account_getLogin = (req, res) => {
    res.render("auth/login", { title: "Log in"});
};

const account_postLogin = (req, res) => {
    //res.render("auth/page4", { title: "Page 2"});
    res.send('logged in');
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