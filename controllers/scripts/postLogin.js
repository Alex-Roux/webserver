const utils = require("../../utils/utils");
const User = require("../../models/user");

const postLogin = async function(req, res) {
    let email = req.body.email, password = req.body.password;

    try {
        let user = await User.login(email, password);
        let token = utils.createToken(user._id);

        res.cookie("jwt", token, { httpOnly: true, maxAge: utils.maxAge * 1000 });
        res.status(200).json({user: user._id});
        utils.log("Logged in ".info + email, 1);
    }
    catch(err) {
        utils.log("Failed signup: ".info + req.body.email, 1);
        let errors = utils.databaseErrorHandler(err).errors;
        
        res.status(400).json({ errors });
    }
};

module.exports = postLogin;