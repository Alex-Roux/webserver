const utils = require("../../utils/utils.js");

const logout = async function() {

    // Logs out the user

    res.render("/", { title: "Home"});
}

module.exports = logout;