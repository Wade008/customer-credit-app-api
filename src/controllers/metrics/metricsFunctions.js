const mongoose = require("mongoose");

const Customer = require("../../models/customer");
const User = require("../../models/user");

//get the number of customers with outstanding credit

async function customerCount(userId, admin) {

    if (admin) {
        const customersWithCredit = await Customer.find(
            { currentcredit: { $gt: 0 } }
        )
        return customersWithCredit.length

    } else {
        const customersWithCredit = await Customer.find(
            { user: userId, currentcredit: { $gt: 0 } }
        )
        return customersWithCredit.length
    }



}

// calculate the total outstanding credit and liabilities
async function sumCredit(userId, admin) {

    // get the value of one credit point for the user

    const user = await User.findById(userId);

    let creditValue = 0;
    //if admin set credit value to 0 as liabiltiies is not applicable
    if (!admin) {
        creditValue = user.creditvalue;
    }

    //get the total amount of credit oustanding 

    let credit = 0;
    if (admin) {
        //if admin sum the credit for all customers regardless of user
        credit = await Customer.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$currentcredit' }
                }
            }

        ]).then((value) => { return value[0]?.total })

    } else {
        //sum the credit for customers with the set user
        credit = await Customer.aggregate([
            { $match: { user: mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$currentcredit' }
                }
            }

        ]).then((value) => { return value[0]?.total })

    }

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
