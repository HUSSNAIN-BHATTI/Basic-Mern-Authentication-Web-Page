const mongoose = require('mongoose');
const bycrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// password encryption using bcrypt
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        // hash the password before creating the user
        const saltRound = await bycrypt.genSalt(10);
        const hash_password = await bycrypt.hash(user.password, saltRound);
        user.password = hash_password;

    } catch (error) {
        next(error);

    }

});

// compare the password

userSchema.methods.comparePassword = async function (password) {
    return bycrypt.compare(password, this.password);
};



//--JWT-- never store json web token in db --
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );

    } catch (error) {
        console.log(error);
    }

};



const User = new mongoose.model("User", userSchema);

module.exports = User;