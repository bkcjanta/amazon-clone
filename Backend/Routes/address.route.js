const express = require("express");
const addressRoute = express.Router();
const { usersModel } = require("../Models/Users.model");
const { isEqual } = require('lodash');

addressRoute.route("/").post(async (req, res) => {

    const { address } = req.body;
    const userID = req.body.userID;
    console.log(address)

    try {
        const user = await usersModel.findOne({ _id: userID });
        console.log(user)
        user.address.push(address);
        await user.save();
        res.status(200).send({ message: "Address added successfully" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Something went wrong" })


    }
}
)

addressRoute.route("/").get(async (req, res) => {
    const userID = req.body.userID;
    try {
        const user = await usersModel.findOne({ _id: userID });
        res.status(200).send({ address: user.address })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Something went wrong" })
    }
}
)

addressRoute.route("/delete").put(async (req, res) => {
    try {
        const { addressID, userID } = req.body;

        // Validate input
        if (!addressID || !userID) {
            return res.status(400).send({ message: "Invalid input data" });
        }

        const updatedUser = await usersModel.findOneAndUpdate(
            { _id: userID },
            { $pull: { address: { _id: addressID } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: "User or address not found" });
        }

        res.status(200).send({ message: "Address deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});


addressRoute.route("/").put(async (req, res) => {
    try {
        const { address, userID, addressID } = req.body;
        console.log(address, userID, addressID)

        // Validate input
        if (!address || !userID || !addressID) {
            return res.status(400).send({ message: "Invalid input data" });
        }

        const updatedUser = await usersModel.findOneAndUpdate(
            {
                _id: userID,
                "address._id": addressID
            },
            {
                $set: {
                    "address.$": address
                }
            },
            { new: true }
        );
        console.log(updatedUser)
        if (!updatedUser) {
            return res.status(404).send({ message: "User or address not found" });
        }

        res.status(200).send({ message: "Address updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});


module.exports = { addressRoute }
