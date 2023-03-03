const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    storesuburb: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        // validate: {
        //     validator: function (v) {
        //         return /^[0-9]{10}/.test(v);
        //     },
        //     message: '{VALUE} is not a valid phone number'
        // }
    },
    creditvalue: {
        type: Number,
        required: true,
        default: 1,
        min: [1, "No negative values"]
    },
    isAdmin: {
        type: Boolean,
        default: false

    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User