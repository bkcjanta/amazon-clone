const express = require("express");
const productsRoute = express.Router();
const { productsModel } = require("../Models/Products.model");
const { sortBy } = require("lodash");
productsRoute.get("/", async (req, res) => {
    try {
        const products = await productsModel.find();
        res.send(products)
        res.end()
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })

    }
})
productsRoute.get("/:path", async (req, res) => {
    // console.log(req.params.path);
    const pathname = req.params.path
    const param = req.query
    console.log(param)
    const page = +(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit
    let arr = pathname !== "search" ? [{ category: pathname }] : [{}];

    let sortBy = {};

    if (!!param.price) {
        let [min, max] = param.price.split("-").map(Number)
        arr.push({ price: { $gte: min, $lte: max } });

    }
    if (!!param.rating) {
        arr.push({ rating: { $gte: param.rating } })
    }
    if (!!param.discount) {
        arr.push({
            $expr: {
                $gt: [{ $floor: { $multiply: [{ $divide: [{ $subtract: ["$mrp", "$price"] }, "$mrp"] }, 100] } }, Number(param.discount)]
            }
        })

    }
    if (!!param.sortBy) {
        sortBy = { price: param.sortBy }
    }
    if (!!param.sk) {
        const searchRegex = new RegExp(param.sk, 'i');
        console.log(searchRegex);
        arr.push({
            "$or": [
                { category: { $regex: searchRegex } },
                { title: { $regex: searchRegex } },
            ]
        })
    }
    try {
        const products = await productsModel.find({ $and: arr }).sort(sortBy).skip(skip).limit(limit);
        // const total=await productsModel.countDocuments({ $and: arr })
        const total = await productsModel.find({ $and: arr });
        // console.log(total);
        res.send({ data: products, total: total.length, limit: 20, isErr: false })
        res.end()
    } catch (error) {
        console.log(error)
        res.send({ msg: "something went wrong", isErr: true })
        res.end()

    }
})

productsRoute.get("/:path/:details/:_id", async (req, res) => {
    const category = req.params.path;
    const _id = req.params._id;

    try {
        const data = await productsModel.findOne({ $and: [{ category: category }, { _id: _id }] })
        res.send(data)
        res.end()
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })

    }
})


module.exports = { productsRoute }
