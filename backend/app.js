const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const app = express();

const complaintRoutes =
    require("./src/routes/complaintRoutes");
// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

// Allow large Base64 images
app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));


// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {

    res.send("Shopping By Amal API is Running");

});


// =====================================
// ROUTES
// =====================================

app.use("/products", productRoutes);

app.use("/users", userRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);

app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);
app.use("/complaints", complaintRoutes);
// =====================================
// EXPORT APP
// =====================================

module.exports = app;