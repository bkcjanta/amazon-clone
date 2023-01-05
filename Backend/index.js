const express = require("express")
const cors = require("cors");
require("dotenv").config()
const { connect } = require("./Config/db")
const {productRoute}=require("./Routes/product.route")
const app = express()
app.use(express.json())
app.use(cors({
    origin: "*",
}))

app.use("/products",productRoute)

app.listen(process.env.PORT, async () => {
    try {
        await connect()
        console.log("DB is Connected to Sucessssfully....");
        console.log(`http://localhost:${process.env.PORT}`);

    } catch (e) {
        console.log("DB is connected to failed!!!!!")
    }

})