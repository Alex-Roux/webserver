<<<<<<< Updated upstream
const utils = require("../../utils/utils.js");
=======
const utils = require("../../utils/utils")
const User = require("../../models/user");
>>>>>>> Stashed changes

const postLogin = async function(req, res) {
    let { email, password } = req.body;

    try {
        let user = await User.login(email, password);
        let token = utils.createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: utils.maxAge * 1000 });
        res.status(200).json({user: user._id});
        utils.log("Logged in ".info + email, 1);
    }
    catch(err) {
        res.status(400).json({});
    }
}

module.exports = postLogin;