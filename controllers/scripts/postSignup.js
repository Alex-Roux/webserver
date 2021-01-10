const User = require("../../models/user");
const utils = require("../../utils/utils.js");

const postSignup = async function(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = utils.createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: utils.maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch(err) {
        const errors = utils.databaseErrorHandler(err);
        res.status(400).json(errors);
    }
}

module.exports = postSignup;