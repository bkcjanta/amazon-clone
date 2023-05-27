const express = require("express");
const tokenRoute = express.Router();
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { usersModel } = require("../Models/Users.model");
const { generateAccessToken, generateRefreshToken } = require('../Middlewares/generateToken')
tokenRoute.get("/", (req, res) => {
    let x = 1;
    const refreshToken = req.cookies.refreshToken
    // console.log(refreshToken)
    console.log("refresh token request", x++)
    if (!refreshToken) {
        // console.log("object")
        res.status(401).send({ msg: "Please Login Again" })
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                // console.log(err)
                res.status(401).send({ msg: "Please Login Again" })

            } else {
                // console.log(decoded)
                const user = await usersModel.findById(decoded.id)
                const accessToken = generateAccessToken(user._id)
                // console.log(user)
                let userObj = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                }
                res.status(200).send({ user: userObj });
            }
        }
        )
    }

})

module.exports = { tokenRoute }