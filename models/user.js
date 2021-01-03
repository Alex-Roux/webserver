const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const utils = require("../utils/utils.js");

// Creates the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "The email address is required."],
        unique: [true, "This email address is already taken."],
        lowercase: true,
        validate: [isEmail, "Please enter a valid email address."]
    },
    password: {
        type: String,
        required: [true, "The password is required"],
        minlength: [6, "Minimum password length is 6 characters."]
    }
});

userSchema.pre("save", async function() {
    utils.log("Creating a user... " + "Email: ".info + this.email, 1);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.post("save", function(doc, next) {
    utils.log("New user created. " +"ID: ".info + doc._id, 1);
    next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;