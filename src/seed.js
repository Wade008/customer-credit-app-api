
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const Customer = require("./models/customer");

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://localhost:27017/customer-credit-api", async () => {



    await Customer.deleteMany({})
    await User.deleteMany({})
    
    const hashedPassword1 = await bcrypt.hash("mypassword", 10)
    const hashedPassword2 = await bcrypt.hash("stark2", 10)

    const newUsera = await User.create({
        firstname: "Wade",
        lastname: "Doolan",
        username: "doolanw",
        companyname: "My Company",
        storesuburb: "Brisbane",
        email: "wdoolan@gmail.com",
        password: hashedPassword1,
        phone: "0448175351",
        creditvalue: 2,
        isAdmin: true
       
    })
    const newUserb = await User.create({
        firstname: "Tony",
        lastname: "Stark",
        username: "starkt",
        companyname: "Stark Enterprises",
        storesuburb: "New York",
        email: "ts@gmail.com",
        password: hashedPassword2,
        phone: "0448569351",
        creditvalue: 4
       
    })

    const customer1 = await Customer.create({
        firstname: "Peter",
        lastname: "Parker",
        email: "p@p.com",
        phone: "17894561230",
        currentcredit: 50,
        user: newUsera._id
    })

    const customer2 = await Customer.create({
        firstname: "Iron",
        lastname: "Man",
        email: "IM@2.com",
        phone: "7894561230",
        currentcredit: 2000,
        user: newUsera._id
    })

    const customer3 = await Customer.create({
        firstname: "Captain",
        lastname: "Marvel",
        email: "cm@2.com",
        phone: "7894561230",
        currentcredit: 300,
        user: newUsera._id
    })
    const customer4 = await Customer.create({
        firstname: "Ant",
        lastname: "Man",
        email: "am@2.com",
        phone: "7894561230",
        currentcredit: 40,
        user: newUsera._id
    })
    const customer5 = await Customer.create({
        firstname: "Black",
        lastname: "Panther",
        email: "bp@2.com",
        phone: "7894561230",
        currentcredit: 79,
        user: newUsera._id
    })
    const customer6 = await Customer.create({
        firstname: "Black",
        lastname: "Panther",
        email: "bp@2.com",
        phone: "7894561230",
        currentcredit: 79,
        user: newUserb._id
    })
    const customer7 = await Customer.create({
        firstname: "Ant",
        lastname: "Man",
        email: "am@2.com",
        phone: "7894561230",
        currentcredit: 40,
        user: newUserb._id
    })


    console.log(newUsera)
    console.log("Seed successfully")
    mongoose.connection.close()
})
