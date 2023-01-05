const express=require("express");
const productRoute=express.Router();
const {productModel}=require("../Models/Products.model")
productRoute.get("/mobiles",async (req,res)=>{
    try {
        const products= await productModel.find({category:"mobiles"})
        res.send(products)
        res.end()
      } catch (error) {
        res.send({"msg":"something went wrong"})
      }
})


module.exports={productRoute}
