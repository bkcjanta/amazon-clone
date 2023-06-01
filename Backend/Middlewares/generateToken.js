// write code for generating token
require("dotenv").config()
const jwt = require("jsonwebtoken")
const generateAccessToken = (id) => {
    return jwt.sign({ userID: id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "15s" })
}

const generateRefreshToken = (id) => {
    return jwt.sign({ userID: id }, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: "20m" })
}

module.exports = { generateAccessToken, generateRefreshToken }
