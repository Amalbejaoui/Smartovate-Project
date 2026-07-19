const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {

    addToCart,
    getCart,
    removeFromCart

} = require("../controllers/cartController");


// Add Product
router.post(
    "/",
    authenticateToken,
    addToCart
);


// Get Cart
router.get(
    "/",
    authenticateToken,
    getCart
);


// Delete Item
router.delete(
    "/:id",
    authenticateToken,
    removeFromCart
);

module.exports = router;