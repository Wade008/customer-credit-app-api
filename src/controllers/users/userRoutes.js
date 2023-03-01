const express = require("express")

const { signUpUser, signInUser, getUserDetails, updateUserDetails, deleteUser, getAllUsers } = require("./userFunctions")

const auth = require("../../middlewares/auth");

const userRouter = express.Router();



userRouter.post("/register", async (req, res) => {
    const token = await signUpUser({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        companyname: req.body.companyname,
        storesuburb: req.body.storesuburb,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        creditvalue: req.body.creditvalue
    })
    if (token.error) {
        return res.status(400).json({ data: token.error })
    }
    return res.json({ token }) //pass a token object to the front end... can write just token since key and value are both token... this is js shortcut
})

userRouter.post("/login", async (req, res) => {
    const token = await signInUser({
        username: req.body.username,
        password: req.body.password,
    })
    if (token.error) {
        return res.status(400).json({ data: token.error })
    }
    return res.json({ token }) //pass token object to front end
})


//get a user details

userRouter.get("/profile", auth, async (req, res) => {

    const userId = req.payload.id;

    const user = await getUserDetails(userId);

    if (!user) {
        res.status(404).json({
            data: "User not found"
        })
    }

    res.json(user)

})

//get all users - for admin only - not included in app front,however.

userRouter.get("/users", auth, async (req, res) => {
    const admin = req.payload.admin;

    const users = await getAllUsers(admin);

    res.json(users)

})

//update user details

userRouter.put("/profile", auth, async (req, res) => {

    const userId = req.payload.id;

    const updatedUser = await updateUserDetails(userId, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        companyname: req.body.companyname,
        storesuburb: req.body.storesuburb,
        email: req.body.email,
        // password: req.body.password,
        phone: req.body.phone,
        creditvalue: req.body.creditvalue
    })

    res.json(updatedUser)
})

//delete user and all associated customers

userRouter.delete("/profile", auth, async (req, res) => {

    const userId = req.payload.id;
    const deletedUser = await deleteUser(userId)

    res.json(deletedUser)

})



module.exports = userRouter