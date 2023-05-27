const mongoose=require('mongoose');
const otpSchema=mongoose.Schema({
    number:{type:String},
    email:{type:String},
    otp:{type:String}
}, {timestamps: true})
otpSchema.index({createdAt: 1},{expireAfterSeconds: 30});
const otpModel=mongoose.model("otp",otpSchema);
module.exports={otpModel}