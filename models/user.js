const mongoose = require("mongoose");
const { isEmail } = require("validator");

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

userSchema.post("save", function(doc, next) {
    console.log("a");
    next();
})

const User = mongoose.model("user", userSchema);




module.exports = User;