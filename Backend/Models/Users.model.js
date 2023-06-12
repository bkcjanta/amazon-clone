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
    mobile: { type: String, required: true, default: "" },
    password: { type: String, required: true, default: "" },
    address: [{
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        mobile: String,
        fullName: String,
        flat: String,
        landmark: String,
        area: String,
        town: String,

    }
    ]
})

const usersModel = mongoose.model("user", usersSchema);
module.exports = { usersModel };