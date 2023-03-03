const jwt = require("jsonwebtoken")

function auth(request, response, next) {

    let token = request.get("authorization")
    token = token?.split(" ")?.[1]
    // console.log(token)
    //check token
    if (!token) {
        return response.status(401).json({ data: "Access denied" })
    }

    try {
        // successfully verifies, gives payload. not verified, throws error
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //put the payload(id) in the request for other functions to use
        request.payload = payload
        next()
    } catch (err) {
        console.log(err)
        return response.status(401).json({ data: "Access denied" })
    }
}

module.exports = auth