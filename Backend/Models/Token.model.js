const mongoose = require('mongoose');
const tokensSchema = mongoose.Schema({
    userID: { type: String, required: true },
    refreshToken: { type: String, required: true },

})

const tokensModel = mongoose.model("user", tokensSchema);
module.exports = { tokensModel };