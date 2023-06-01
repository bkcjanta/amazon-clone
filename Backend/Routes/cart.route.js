const express = require("express");
const cartRoute = express.Router();
const { cartModel } = require("../Models/cart.model");


cartRoute.get("/", async (req, res) => {
    try {
        const userID = req.body.userID;
        const data = await cartModel.find({ userID: userID }).sort({ createdAt: -1 });
        res.send({ data: data, msg: "cart data fetched" })
    } catch (error) {
        console.log(error)
        res.send({ msg: "something went wrong", isErr: true })
        res.end()
    }
})




cartRoute.post("/", async (req, res) => {
    console.log(req.body)

    try {
        let { userID, _id, image, title, mrp, price, category, rating, review, quantity } = req.body;


        const cartData = await cartModel.find({ $and: [{ userID: userID }, { productID: _id }] });
        console.log("cartdata", cartData)
        if (cartData.length) {

            const qty = +(cartData[0].quantity) + +quantity;
            console.log("qty", qty)
            newCarrdata = await cartModel.update({ productID: _id }, { $set: { quantity: qty } })

        } else {
            const cart = new cartModel({ userID: userID, productID: _id, image, title, mrp, price, category, rating, review, quantity });
            const newCart = await cart.save();
        }
        res.send({ mag: "product added to cart" })
    } catch (error) {
        console.log(error)
        res.send({ msg: "something went wrong", isErr: true })
        res.end()

    }
})

//upaate cart

cartRoute.put("/", async (req, res) => {
    console.log(req.body)
    try {
        const { _id, quantity } = req.body;
        const newCarrdata = await cartModel.update({ _id: _id }, { $set: { quantity: quantity } })
        res.send({ msg: "cart updated" })
    } catch (error) {
        console.log(error)
        res.send({ msg: "something went wrong", isErr: true })
        res.end()
    }
})


//remove from cart

cartRoute.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    try {

        console.log("product id", _id)
        const newCarrdata = await cartModel.deleteOne({ _id: _id })
        console.log(newCarrdata)
        res.send({ msg: "product removed from cart" })
    } catch (error) {
        console.log(error)
        res.send({ msg: "something went wrong", isErr: true })
        res.end()
    }
})





module.exports = { cartRoute }
