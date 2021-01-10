

const logout = async function(req, res) {

    // Logs out the user

    res.render("/", { title: "Home"});
}

module.exports = logout;