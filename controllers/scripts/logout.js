const logout = async function(req, res) {
    res.cookie("jwt", "", { maxAge: 10 });
    res.redirect("/");
};

module.exports = logout;