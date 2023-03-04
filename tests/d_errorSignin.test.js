


const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../src/server");



beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/customer-credit-api")


})

afterAll(async () => {

    
    await mongoose.connection.close();
})


describe("Tests password error at signin", () =>{
    it("Incorrect password at signin", async () =>{
        const response = await request(app).post("/auth/login").send({
            username: "starkt",
            password: "wrongpassword"
        })

        expect(response.statusCode).toBe(400)

    }) 

})


describe("Tests username error at signin", () =>{
    it("Username does not exists ", async () =>{
        const response = await request(app).post("/auth/login").send({
            username: "starkwrong",
            password: "stark2"
        })

        expect(response.statusCode).toBe(400)

    }) 

})


describe("Test username already taken", () =>{
    it("Error as username has already been taken", async () =>{

        const response = await request(app).post("/auth/register").send({
            firstname: "Peter",
            lastname: "Parker",
            username: "starkt",
            companyname: "Spiderman workwear",
            storesuburb: "Brisbane",
            email: "pp@gmail.com",
            phone: "0448569351",
            creditvalue: 2,
            password:"password"
        })

        expect(response.statusCode).toBe(400)

    }) 


})



