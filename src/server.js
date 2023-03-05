const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require('dotenv')

const userRouter = require("./controllers/users/userRoutes")
const customerRouter = require("./controllers/customers/customerRoutes");
const metricsRouter = require("./controllers/metrics/metricsRoutes")

dotenv.config();

const app = express();

app.use(helmet());

app.use(express.json());

const corsOption = {
    origin: ["http://localhost:3000"],
    optionSuccessStatus: 200
}

app.use(cors(corsOption));

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({
        data: "Testing testing..."
    })
})

app.use("/customers", customerRouter)
app.use("/metrics", metricsRouter)
app.use("/auth", userRouter)

module.exports = {
    app,
    PORT
}