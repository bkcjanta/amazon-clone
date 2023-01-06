const mongoose = require('mongoose');
const productsSchema = mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default:1,min: 1, max: 5 },
    review: { type: Number, default:1 }

})

const productsModel=mongoose.model("product",productsSchema);
module.exports={productsModel};