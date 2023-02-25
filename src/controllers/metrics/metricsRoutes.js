const express = require("express")

const { customerCount, sumCredit } = require("./metricsFunctions");

const auth = require("../../middlewares/auth");

const metricsRouter = express.Router();

// get all metrics by calling the three functions
metricsRouter.get("/", auth, async (req, res) => {

    const userId = req.payload.id;

    // get count of customers
    const numberCustomers = await customerCount(userId)

    //get count of credit points
    const creditLiabilities = await sumCredit(userId)

    const totalCredit = creditLiabilities.credit

    //get total liabilities for store

    const totalLiabilities = creditLiabilities.liabilities


    const metricData = {
        customers: numberCustomers,
        credit: totalCredit,
        liabilities: totalLiabilities
    }

    res.json(metricData)


})


module.exports = metricsRouter