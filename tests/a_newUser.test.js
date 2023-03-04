const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../src/server");

let token = "";

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/customer-credit-api")

    const response = await request(app).post("/auth/register").send({
        firstname: "Peter",
        lastname: "Parker",
        username: "parkerp",
        companyname: "Spiderman workwear",
        storesuburb: "Brisbane",
        email: "pp@gmail.com",
        phone: "0448569351",
        creditvalue: 2,
        password:"password"

    })

    token = response.body.token

})

afterAll(async () => {
    await mongoose.connection.close();
})


describe("Get user details", () => {
    it("Should get the details of the currently logged in user", async () => {
        const response = await request(app).get("/auth/profile").set({ Authorization: `Bearer ${token}` })

        expect(response.statusCode).toBe(200)
        expect(response.body.username).toEqual("parkerp")

    })
})


describe("Update user details", () => {
    it("Update some details of the currently logged in user", async () => {

        const response = await request(app).put("/auth/profile").set({ Authorization: `Bearer ${token}`}).send({
            firstname: "Peter",
            lastname: "Parker",
            username: "parkerp",
            companyname: "Spiderman workwear",
            storesuburb: "Sydney",
            email: "pp@gmail.com",
            phone: "0448569351",
            creditvalue: 4

        })

        expect(response.statusCode).toBe(200)
        expect(response.body.storesuburb).toEqual("Sydney")
        expect(response.body.creditvalue).toEqual(4)

    })
})

describe("Update user username", () => {
    it("Update username with username that already exists", async () => {

        const response = await request(app).put("/auth/profile").set({ Authorization: `Bearer ${token}` }).send({
            firstname: "Peter",
            lastname: "Parker",
            username: "starkt",
            companyname: "Spiderman workwear",
            storesuburb: "Sydney",
            email: "pp@gmail.com",
            phone: "0448569351",
            creditvalue: 4

        })

        expect(response.body.error).toEqual("This username has already been taken")
    })
})


describe("Delete user", () => {
    it("Should delete the current user and all associated customers", async () => {

        const response = await request(app).delete("/auth/profile").set({ Authorization: `Bearer ${token}` })

        expect(response.statusCode).toBe(200)

    })
})

