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
    const totalCredit = sumCredit(userId)   

    console.log(totalCredit)

    const metricData = {
        customers: numberCustomers,
        // credit: totalCredit
    }

 





    res.json(metricData)


})


module.exports = metricsRouter