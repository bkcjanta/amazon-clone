const express=require("express");
const productsRoute=express.Router();
const {productsModel}=require("../Models/Products.model");
const { sortBy } = require("lodash");
productsRoute.get("/:path",async (req,res)=>{
    console.log(req.params.path);
    const pathname=req.params.path
    const param=req.query
    const page=+(req.query.page)||1;
    const limit=10;
    const skip=(page-1)*limit
    let arr=[{ category: pathname }]
    let q={}
    let sort_by={}
    for(let k in param ){
        if(param[k]!="null"){
            q[k]=param[k]
        }
    }
    for(let k in q){
        if(k=="price"){
            let [min,max]=q[k].split("-").map(Number)
            arr.push({price:{$gt:min}})
            arr.push({price:{$lt:max}})
        }else if(k=="rating"){
            const rating=+(q[k])
            arr.push({rating:{$gte:rating}})
        }else if(k=="sortBy"){
            sort_by={price:q[k]}
        }else if(k=="discount"){
            const discount=+q[k]
            arr.push({
                $expr:{
                    $gt:[{$floor:{$multiply:[{$divide:[{$subtract:["$mrp","$price"]},"$mrp"]},100]}},discount]
                }
            })
        }
    }
   
    try {   
            const products= await productsModel.find({$and:arr}).sort(sort_by)
            res.send(products)
            res.end()
        
        
        
      } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong"})
      }
})


module.exports={productsRoute}
