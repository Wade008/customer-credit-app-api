const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

async function signUpUser(user) {
    // Has the username been taken?
    const exists = await User.findOne({ username: user.username })
    if (exists) {
        return { error: "This username has already been taken" }
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = await User.create({
        firstname: user.firstname,
        lastname: user.lastname,
        companyname: user.companyname,
        storesuburb: user.storesuburb,
        email: user.email,
        password: hashedPassword,
        phone: user.phone,
        creditvalue: user.creditValue,
        customers: []
    })

    const payload = {
        id: newUser._id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return token

}

async function signInUser(user) {
    // Does the user exists?
    const existingUser = await User.findOne({ username: user.username })

    if (!existingUser) {
        return { error: "Username or password in incorrect" }
    }

    //check the password
    const checkOut = await bcrypt.compare(user.password, existingUser.password)

    if (!checkOut) {
        return { error: "username or password is incorrect" }
    }

    // generate the token

    const payload = {
        id: existingUser._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return token

}

module.exports = {
    signUpUser,
    signInUser
}