
const Customer = require("../../models/customer");


//get the number of customers with outstanding credit

async function customerCount(userId) {

    const customersWithCredit = await Customer.find(
        { user: userId, currentcredit: { $gt: 0 } }
    )

    return customersWithCredit.length

}

async function sumCredit(userId) {

    const totalCredit = await Customer.aggregate([
        { $match: { user: userId } }
        // {
        //     $group: {
        //         _id: "$user",
        //         total: { $sum: "Scurrentcredit" }
        //     }
        // }

    ])
    console.log(totalCredit)
    return totalCredit


}



module.exports = {
    customerCount,
    sumCredit
}
