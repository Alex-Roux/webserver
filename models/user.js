const mongoose = require("mongoose");
const { isEmail } = require("validator");


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
        minlength: 6
    }
});

const User = mongoose.model("user", userSchema);


module.exports = User;