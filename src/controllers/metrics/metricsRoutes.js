const express = require("express")

const { customerCount, sumCredit } = require("./metricsFunctions");

const auth = require("../../middlewares/auth");

const metricsRouter = express.Router();

// get all metrics by calling the three functions
metricsRouter.get("/", auth, async (req, res) => {

    const userId = req.payload.id;
    const admin = req.payload.admin;

    // get count of customers
    const numberCustomers = await customerCount(userId, admin)

    //get count of credit points
    const creditLiabilities = await sumCredit(userId, admin)

    const totalCredit = creditLiabilities.credit

    //get total liabilities for store

    const totalLiabilities = creditLiabilities.liabilities


    const metricData = [
        {
            id: 1,
            title: "No. customers with outstanding credit",
            value: numberCustomers
        },
        {
            id: 2, title: "Total outstanding store credit",
            value: totalCredit
        },
        {
            id: 3,
            title: "Store credit liabilities",
            value: totalLiabilities
        }
    ]

    res.json(metricData)


})


module.exports = metricsRouter