const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Customer = require("../../models/customer");


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
        username: user.username,
        companyname: user.companyname,
        storesuburb: user.storesuburb,
        email: user.email,
        password: hashedPassword,
        phone: user.phone,
        creditvalue: user.creditvalue


    })

    const payload = {
        id: newUser._id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })

    return token

}

async function signInUser(user) {
    // Does the user exists?
    const existingUser = await User.findOne({ username: user.username })

    if (!existingUser) {
        return { error: "Username or password is incorrect" }
    }

    //check the password
    const checkOut = await bcrypt.compare(user.password, existingUser.password)

    if (!checkOut) {
        return { error: "username or password is incorrect" }
    }

    // generate the token - check if admin first

    let adminSetting = false

    //if admin, verify that admin has corrct username
    if (existingUser.isAdmin && existingUser.username === process.env.USERNAME) {
        adminSetting = true
    }

    const payload = {
        id: existingUser._id,
        admin: adminSetting
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })

    return token

}


async function getUserDetails(userId) {

    try {
        const user = await User.findById(userId)
        return user
    } catch (err) {

        return { error: "User not found" }

    }

}
async function getAllUsers(admin) {

    if (admin) {
        const users = await User.find();
        return users
    } else {
        return { error: "You do not have permission to access this information" }
    }

}

async function updateUserDetails(userId, user) {
    // const hashedPassword = await bcrypt.hash(user.password, 10)

    const exists = await User.findOne({ username: user.username, _id: { $ne: userId } })
    if (exists) {
        return { error: "This username has already been taken" }
    }
    //check if username is already taken

    const updateUser = await User.findByIdAndUpdate(userId, {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        companyname: user.companyname,
        storesuburb: user.storesuburb,
        email: user.email,
        // password: hashedPassword,
        phone: user.phone,
        creditvalue: user.creditvalue
    }, { new: true, upsert: true })

    return updateUser
}

//delete user and associated customers

async function deleteUser(userId, admin) {

    //check if admin - admin cannot be deleted
    if (admin) {
        return { error: "admin cannot be deleted" }
    }

    //if not admin
    // //step 1. delete all customers referenced to the user
    // console.log(userId)

    const deletedCustomers = await Customer.deleteMany({ user: userId })

    // const user = await User.findById(userId)

    // step 2. delete the user

    const deletedUser = await User.deleteOne({ _id: userId })

    return {
        deletedCustomers,
        deletedUser
        // message: "User and all associated customers have been deleted"
    }

}


module.exports = {
    signUpUser,
    signInUser,
    getUserDetails,
    updateUserDetails,
    deleteUser,
    getAllUsers
}