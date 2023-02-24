const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}/.test(v);
            },
            message: '{VALUE} is not a valid phone number'
        }
    },
    currentcredit: {
        type: Number,
        required: true,
        min: [0, "No negative values"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
   
});

const Customer = mongoose.model("Customer", CustomerSchema)

module.exports = Customer