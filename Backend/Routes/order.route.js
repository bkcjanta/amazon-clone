const express = require("express");
const orderRoute = express.Router();
const { orderModel } = require("../Models/order.model");
const { cartModel } = require("../Models/cart.model");

orderRoute.post("/", async (req, res) => {
    try {
        const { userID, deliveryAddress, paymentMethod } = req.body;
        const cartData = await cartModel.find({ userID: userID });
        console.log(deliveryAddress);
        if (cartData.length) {
            let orderData = cartData.map((item) => {
                return {
                    userID: item.userID,
                    productID: item.productID,
                    image: item.image,
                    title: item.title,
                    mrp: item.mrp,
                    price: item.price,
                    category: item.category,
                    rating: item.rating,
                    review: item.review,
                    quantity: item.quantity,
                    deliveryAddress: deliveryAddress,
                    paymentMethod: paymentMethod,
                    orderStatus: "Pending",
                    activeStatus: true,
                }
            })
            console.log(orderData);
            await orderModel.insertMany(orderData);
            await cartModel.deleteMany({ userID: userID });
            res.status(200).send({ msg: "order placed" })
        } else {
            res.status(200).send({ msg: "cart is empty" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "something went wrong", isErr: true })
        res.end()
    }
}
)

orderRoute.get("/", async (req, res) => {
    try {
        const { userID } = req.body;

        const orderData = await orderModel.find({ userID: userID }).sort({ updatedAt: -1 });
        res.status(200).send({ data: orderData, msg: "ordered data" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "something went wrong" });
    }
})

// canceler order

orderRoute.put("/cancel", async (req, res) => {
    try {
        const { orderID, userID } = req.body;
        const data = await orderModel.updateOne({ _id: orderID, userID: userID }, { $set: { orderStatus: "Cancelled" } });
        res.status(200).send({ msg: "order cancelled" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "something went wrong" });
    }
})


module.exports = { orderRoute };