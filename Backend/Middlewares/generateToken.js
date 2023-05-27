// write code for generating token
require("dotenv").config()
const jwt = require("jsonwebtoken")
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "10s" })
}

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: "1d" })
}

module.exports = { generateAccessToken, generateRefreshToken }