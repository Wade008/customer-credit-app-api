
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const Customer = require("./models/customer");

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://localhost:27017/customer-credit-api", async () => {



    await Customer.deleteMany({})
    await User.deleteMany({})
    
    const hashedPassword = await bcrypt.hash("mypassword", 10)


    const customer1 = await Customer.create({
        firstname: "Peter",
        lastname: "Parker",
        email: "p@p.com",
        phone: "17894561230",
        currentCredit: 50
    })

    const customer2 = await Customer.create({
        firstname: "Iron",
        lastname: "Man",
        email: "IM@2.com",
        phone: "7894561230",
        currentCredit: 2000
    })

    const customer3 = await Customer.create({
        firstname: "Captain",
        lastname: "Marvel",
        email: "cm@2.com",
        phone: "7894561230",
        currentCredit: 300
    })
    const customer4 = await Customer.create({
        firstname: "Ant",
        lastname: "Man",
        email: "am@2.com",
        phone: "7894561230",
        currentCredit: 40
    })
    const customer5 = await Customer.create({
        firstname: "Black",
        lastname: "Panther",
        email: "bp@2.com",
        phone: "7894561230",
        currentCredit: 79
    })




    const newUser = await User.create({
        firstname: "Wade",
        lastname: "Doolan",
        companyname: "My Company",
        storesuburb: "Brisbane",
        email: "wdoolan@gmail.com",
        password: hashedPassword,
        phone: "0448175351",
        creditvalue: 2,
        customers:[customer1._id, customer2._id, customer3._id, customer4._id, customer5._id]
    })
    console.log(newUser)
    console.log("Seed successfully")
    mongoose.connection.close()
})
