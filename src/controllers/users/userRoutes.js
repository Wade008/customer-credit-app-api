const express = require("express")

const { signUpUser, signInUser } = require("./userFunctions")

const userRouter = express.Router();

userRouter.post("/register", async (request, response) => {
    const token = await signUpUser({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        username: request.body.username,
        companyname: request.body.companyname,
        storesuburb: request.body.storesuburb,
        email: request.body.email,
        password: request.body.password,
        phone: request.body.phone,
        creditvalue: request.body.creditvalue
    })
    if (token.error) {
        return response.status(400).json({ data: token.error })
    }
    return response.json({ token }) //pass a token object to the front end... can write just token since key and value are both token... this is js shortcut
})

userRouter.post("/login", async (request, response) => {
    const token = await signInUser({
        username: request.body.username,
        password: request.body.password,
    })
    if (token.error) {
        return response.status(400).json({ data: token.error })
    }
    return response.json({ token }) //pass toek object to front end
})

module.exports = userRouter