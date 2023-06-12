const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    userID: { type: String, required: true },
    productID: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    review: { type: Number, default: 1 },
    quantity: { type: Number, default: 1 },
    deliveryAddress: { type: {}, required: true },
    paymentMethod: { type: String, required: true },
    orderStatus: { type: String, default: "Pending" },
    activeStatus: { type: Boolean, default: true },
},
    { timestamps: true }
)

const orderModel = mongoose.model("order", orderSchema);
module.exports = { orderModel };
