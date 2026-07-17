const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/productRoutes");


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Shopping By Amal API is Running");
});


app.use("/products", productRoutes);


module.exports = app;