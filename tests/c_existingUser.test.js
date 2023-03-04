


const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../src/server");

let token;
let id = "";

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/customer-credit-api")

    const response = await request(app).post("/auth/login").send({
        username: "starkt",
        password: "stark2"
    })

    token = response.body.token

})

afterAll(async () => {

    
    await mongoose.connection.close();
})


//test the home route

describe("Server home route", () => {
    it("returns Testing testing... message", async () => {
        const response = await request(app).get("/")

        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual(expect.stringContaining("Testing testing..."))
    })
})


//Test customers routes

//using authorisation get all customers for a user

describe("Gets all customers", () => {
    it("Gets all customers for the user", async () => {
        const response = await request(app).get("/customers").set({ Authorization: `Bearer ${token}`})

        expect(response.statusCode).toBe(200)
    })
})

//prepare the id variable to be used in the get, put and delete tests below


describe("Add a customer", () => {
    it("adds a new customer to the database", async () => {
        const response = await request(app).post("/customers").set({ Authorization: `Bearer ${token}` }).send({
            firstname: "James",
            lastname: "Bond",
            email: "james@007.com",
            phone: "0448256987",
            currentcredit: 100
        })
        //set the id to be used in the tests below
        id = response.body._id

        expect(response.statusCode).toBe(200)
        expect(response.body.email).toEqual("james@007.com")
    })
})


describe("Get a customer", () => {
    it("Returns one customer based on params", async () => {

        const response = await request(app).get(`/customers/${id}`).set({ Authorization: `Bearer ${token}` })

        expect(response.statusCode).toBe(200)
        expect(response.body.lastname).toEqual("Bond")

    })
})


describe("Get a customer", () => {
    it("Returns an error due to incorrect param", async () => {

        const response = await request(app).get(`/customers/aaa`).set({ Authorization: `Bearer ${token}` })

        expect(response.statusCode).toBe(404)
      

    })
})


describe("Update a customer", () => {
    it("Updates an existing customer in the database", async () => {

        const response = await request(app).put(`/customers/${id}`).set({ Authorization: `Bearer ${token}`}).send({
            firstname: "James",
            lastname: "Bond",
            email: "james@007.com",
            phone: "0448256987",
            currentcredit: 200
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.currentcredit).toEqual(200)
    })
})


describe("Delete a customer", () => {
    it("Should delete a customer", async () => {
        const response = await request(app).delete(`/customers/${id}`).set({ Authorization: `Bearer ${token}`})

        expect(response.statusCode).toBe(200)
        expect(response.body._id).toEqual(id)

    })
})

//test metrics route

describe("Get metrics data", () => {
    it("Should get metrics data", async () => {
        const response = await request(app).get("/metrics").set({ Authorization: `Bearer ${token}`})

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: "No. customers with outstanding credit"
                })
            ])
        )

    })
})

//Test user routes
//Get user details

describe("Get user details", () => {
    it("Should get the details of the currently logged in user", async () => {
        const response = await request(app).get("/auth/profile").set({ Authorization: `Bearer ${token}`})

        expect(response.statusCode).toBe(200)
        expect(response.body.username).toEqual("starkt")

    })
})


//test unauthorised access


describe("Gets all customers with an old token", () => {
    it("Gets all customers with an old token", async () => {
        const response = await request(app).get("/customers").set({ Authorization: `Bearer `})

        expect(response.statusCode).toBe(401)
    })
})

