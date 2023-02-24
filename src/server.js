const express = require('express');
const dotenv = require('dotenv').config();

const userRouter = require("./controllers/users/userRoutes")

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({
        data: "Testing testing..."
    })
})


app.use("/auth", userRouter)

module.exports = {
    app,
    PORT
}