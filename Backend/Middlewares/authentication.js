require('dotenv').config()
const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    // console.log(req.headers)
    var accessToken = req.headers?.authorization?.split(" ")[1]
    console.log(accessToken)
    if (accessToken) {
        try {
            const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY)
            console.log(decoded)
            req.body.userID = decoded.userID
            next()

        } catch (error) {
            console.log(error)
            res.status(401).send({ Failed: "Please login again !" })
        }

    } else {
        res.status(401).send({ Failed: "Please login again !" })
    }
}

module.exports = { authenticate }