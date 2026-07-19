const express = require("express");
const router = express.Router();

const validateProduct = require("../middleware/productValidation");
const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
    getProducts,
    addProduct,
    updateProduct,
    removeProduct
} = require("../controllers/productController");


// ===================================
// GET PRODUCTS
// Everyone can view products
// ===================================
router.get("/", getProducts);


// ===================================
// CREATE PRODUCT
// Admin Only
// ===================================
router.post(
    "/",
    authenticateToken,
    isAdmin,
    validateProduct,
    addProduct
);


// ===================================
// UPDATE PRODUCT
// Admin Only
// ===================================
router.put(
    "/:id",
    authenticateToken,
    isAdmin,
    validateProduct,
    updateProduct
);


// ===================================
// DELETE PRODUCT
// Admin Only
// ===================================
router.delete(
    "/:id",
    authenticateToken,
    isAdmin,
    removeProduct
);


module.exports = router;