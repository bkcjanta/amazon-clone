const express = require("express")
const cors = require("cors");
require("dotenv").config()
const { connect } = require("./Config/db")
var cookieParser = require('cookie-parser');
const { productsRoute } = require("./Routes/product.route")
const { usersRoute } = require("./Routes/user.route");
const { authRoute } = require("./Routes/auth.route");
const { tokenRoute } = require("./Routes/token.route");
const { cartRoute } = require("./Routes/cart.route");
const { orderRoute } = require("./Routes/order.route")
const { addressRoute } = require("./Routes/address.route")
const { authenticate } = require("./Middlewares/authentication");
const expressSession = require('express-session');
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
    optionSuccessStatus: 200,      //access-control-allow-credentials:true  
}))

app.get("/", (req, res) => {
    res.send("hello world")
})

app.use("/products", productsRoute);
app.use("/cart", authenticate, cartRoute);
app.use("/order", authenticate, orderRoute);
app.use("/address", authenticate, addressRoute);
app.use("/user", usersRoute);
app.use("/auth", authRoute);
app.use("/accesstoken", tokenRoute);


//connecting to database and running server
app.listen(process.env.PORT, async () => {
    try {
        connect();
        console.log("DB is Connected to Sucessssfully....");
        console.log(`http://localhost:${process.env.PORT}`);

    } catch (e) {
        console.log("DB is connected to failed!!!!!")
    }

})