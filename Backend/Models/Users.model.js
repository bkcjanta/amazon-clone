const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    google: {
        id: { type: String },
        name: { type: String },
        email: { type: String },
        avatar: { type: String }
    },
    name: { type: String, required: true, default: "" },
    email: { type: String, required: true, default: "" },
    // mobile: { type: String, required: true, default: "" },
    password: { type: String, required: true, default: "" },
    address: {
        city: String,
        pin: Number,
        country: String,
        house_no: String,
        address: String,
        landmark: String,
        district: String
    }
})

const usersModel = mongoose.model("user", usersSchema);
module.exports = { usersModel };