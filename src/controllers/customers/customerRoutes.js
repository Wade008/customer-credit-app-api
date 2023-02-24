express = require("express");

const { getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer } = require("./customerFunctions");

const auth = require("../../middlewares/auth");

const customerRouter = express.Router();

//get all customers for the user

customerRouter.get("/", auth, async (req, res) => {
    // console.log(req.payload.id)
    const userId = req.payload.id;
    const customers = await getCustomers(userId)

    res.json(customers)
})

customerRouter.get("/:customerId", auth, async (req, res) => {
    const customer = await getCustomerById(req.params.customerId)

    if (!customer) {
        res.status(404).json({
            data: "Customer not found"
        })
    }

    res.json(customer)

})

customerRouter.post("/", auth, async (req, res) => {

    const userId = req.payload.id;

    const customer = await addCustomer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        currentcredit: req.body.currentcredit,
        user: userId
    })

    res.json(customer)

})

customerRouter.put("/:customerId", auth, async (req, res) => {
    const userId = req.payload.id;
    const updatedCustomer = await updateCustomer(req.params.customerId, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        currentcredit: req.body.currentcredit,
        user: userId
    })

    res.json(updatedCustomer)
})

customerRouter.delete("/:customerId", auth, async (req, res) => {
    const customer = await deleteCustomer(req.params.customerId)
    res.json(customer)



})



module.exports = customerRouter

