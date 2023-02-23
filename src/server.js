const express = require('express');
const dotenv = require('dotenv').config();



const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({
        data: "Testing testing..."
    })
})

module.exports = {
    app,
    PORT
}