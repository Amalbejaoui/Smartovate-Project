const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Shopping By Amal API is Running");
});


app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
module.exports = app;