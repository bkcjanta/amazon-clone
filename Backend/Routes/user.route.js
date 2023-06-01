const express = require("express");
const usersRoute = express.Router();
const { usersModel } = require("../Models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../Middlewares/generateToken");

usersRoute.post("/signup", async (req, res) => {
      const { name, email, mobile, password } = req.body;
      console.log(req.body);
      const isUser = await usersModel.findOne({ "email": email });
      if (isUser) {
            res.status(400).send({ msg: "User already exists!"});
      } else {
            try {
                 hash= await bcrypt.hash(password, 10);
                  if(hash){
                        const newUser = new usersModel({ name, email, password:hash });
                        const user = await newUser.save();
                        console.log(user)
                        res.status(200).send({ msg: "User Created Successfully!" ,user:user});
                  }else{
                        res.status(400).send({ msg: "something wrong!" });
                  }

            } catch (err) {
                  console.log(err);
                  res.status(400).send({ msg: "something wrong" });
            }}
      })


usersRoute.post("/login", async (req, res) => {

      let { email, password } = req.body;
      try {
            let user = await usersModel.findOne({ email });
            if (user) {
                  const isPasswordMatch = await bcrypt.compare(password, user.password);
                  if (isPasswordMatch) {
                        const accessToken = generateAccessToken(user._id);
                        const refreshToken = generateRefreshToken(user._id);
                       let userObj = {
                              name: user.name,
                              email: user.email,
                              accessToken: accessToken,
                        }
                        
                        res.cookie("refreshToken", refreshToken, { maxAge: 1000*60*20, httpOnly: false, secure: false }).status(200).send({ msg: "Login Success", user: userObj });
                  }else{
                        res.status(400).send({ msg: "Invalid Username or Password" });
                  }
            }else{
                  res.status(400).send({ msg: "User does not exist" });
            }
      
      } catch (err) {
            console.log(err);
            res.status(400).send({ msg: err.message });
      }

    
})

                             


module.exports = { usersRoute };








































// const express = require("express");
// const bcrypt = require("bcrypt")
// const usersRoute = express.Router();
// const jwt=require('jsonwebtoken')
// const {Auth} = require('two-step-auth');
// require("dotenv").config()
// const { usersModel } = require("../Models/Users.model");
// const { GenerateOTP,EmailSender } = require("../Middlewares/otp");
// usersRoute.post("/signup", async (req, res) => {
// console.log(req.body)
//       const { name, email, mobile, password } = req.body;
//       const userPresent = await usersModel.findOne({ $or: [{ "email": email }, { "mobile": mobile }] })
//       if (userPresent?.email || userPresent?.mobile) {
//             res.send({ msg: "User already exists!", isRegistered: true,error:true });
//       } else {
//             try {
//                   bcrypt.hash(password, 10, async (err, hash) => {
//                         if (err) {
//                               res.send({ msg: "something wrong!" ,error:true})
//                         } else {
//                               const newUser = new usersModel({
//                                     name: name,
//                                     email: email,
//                                     mobile: mobile,
//                                     password: hash
//                               })
//                               await newUser.save();
//                               res.send({ msg: "User Created Successfully!" ,error:false});
//                         }
//                   })

//             } catch (err) {
//                   console.log(err);
//                   res.send({ msg: "something wrong",error:true });

//             }
//       }
// })

// usersRoute.post("/login", async (req, res) => {
// //       const email = req.body.email;
// //       EmailSender();
// //       console.log(email);
// //     const otp=GenerateOTP(email)
// //     console.log(otp)
// //     if(otp){
// //       res.send({otp:otp})
// //     }else{
// //       res.send({err:"error"});
// //     }
// console.log(req.body)
// const {email,password}=req.body;
//      try {
//          const userPresent=await usersModel.findOne({email});
//          if(userPresent){
//             const hash_password=userPresent.password;
//             bcrypt.compare(password,hash_password,(err,result)=>{
//                   if(result){
//                          //generate jwt token
//                          const token=jwt.sign({_id:userPresent._id},process.env.ACCESS_TOKEN_PRIVATE_KEY);
//                          const user={
//                                _id:userPresent._id,
//                                name:userPresent.name,
//                                email:userPresent.email,
//                                mobile:userPresent.mobile,
//                          }
 
//                          res.send({data:{user,token},error:false,msg:"login success"})
                       
//                   }else{
                        
//                         res.send({msg:"Login failed",error:true,isPassword:true});
//                   }
//             })
//          }else{
//             console.log("user not found");
//             res.send({msg:"User not found",isUser:true,error:true});
//          }
//      } catch (err) {
//       console.log(err)
//       res.send({erroe:true,mag:"Something wrong"})
//      }

// })

// usersRoute.post("/",(req,res)=>{
//       console.log("user Route")
//       res.cookie("jtwtoken", '123dtfdxgfchgfxf', {maxAge : 10000,httpOnly: false,secure:false})
//       res.send({msg:"cookie set"});
// })
// usersRoute.post("/cookie",(req,res)=>{
//       console.log("user Route")
//       console.log(req.cookies)
//       res.clearCookie('jwt')
//       res.send(req.cookies)
// })



// module.exports = { usersRoute }
