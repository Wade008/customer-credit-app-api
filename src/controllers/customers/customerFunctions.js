const User = require("../../models/user");
const Customer = require("../../models/customer");

// get all customers for a user

async function getCustomers(userId) {

    const customers = await Customer.find({ user: userId })

    return customers
}

// get one custer for a user
async function getCustomerById(customerId) {

    try {
        const customer = await Customer.findById(customerId)
        return customer
    } catch (err) {
        console.error(err);

    }

}

// post one customer for a user

async function addCustomer(customer) {

    const newCustomer = await Customer.create(customer)
    return newCustomer
}

//Update a customer's details or credit balance

async function updateCustomer(customerId, customer) {
    const updateCustomer = await Customer.findByIdAndUpdate(customerId, customer, { new: true, upsert: true })

    return updateCustomer
}

//delete a customer

async function deleteCustomer(customerId) {

    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    return deletedCustomer;

}



module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
}