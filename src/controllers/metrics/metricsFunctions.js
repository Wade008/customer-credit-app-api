const mongoose = require("mongoose");

const Customer = require("../../models/customer");
const User = require("../../models/user");

//get the number of customers with outstanding credit

async function customerCount(userId) {

    const customersWithCredit = await Customer.find(
        { user: userId, currentcredit: { $gt: 0 } }
    )

    return customersWithCredit.length

}

// calculate the total outstanding credit and liabilities
async function sumCredit(userId) {

    // get the value of one credit point for the user
    const user = await User.findById(userId);
    const creditValue = user.creditvalue


    //get the total amount of credit oustanding 
    const credit = await Customer.aggregate([
        { $match: { user: mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: null,
                total: { $sum: '$currentcredit' }
            }
        }

    ]).then((value) => { return value[0]?.total })

    const totalCredit = credit ? credit : 0

    // calculation the total liabilities in dollars

    const totalLiabiltiies = totalCredit * creditValue

    return {
        credit: totalCredit,
        liabilities: totalLiabiltiies
    }

}



module.exports = {
    customerCount,
    sumCredit

}
