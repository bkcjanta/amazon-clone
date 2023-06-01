require('dotenv').config()
const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    var accessToken = req.headers?.authorization?.split(" ")[1]
    if (accessToken) {
        try {
            const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY)
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

