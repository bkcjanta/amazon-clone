const express=require('express')
const authRoute = express.Router();
const passport =require('passport')
authRoute.get("/google/",passport.authenticate("google",{ scope: ['openid','profile', 'email'] }));
authRoute.get("/google/callback",passport.authenticate("google",{session:false,failureRedirect:"http://localhost:3000/login",successRedirect:"http://localhost:3000/home"}),(req,res)=>{
    console.log(req.user)
    res.send({msg:"login success"})
})

module.exports={authRoute}