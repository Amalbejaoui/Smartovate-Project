const express = require("express");

const router = express.Router();

const validateProduct =
    require("../middleware/productValidation");

const authenticateToken =
    require("../middleware/authMiddleware");

const isAdmin =
    require("../middleware/adminMiddleware");


const {

    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct

} = require("../controllers/productController");


// ===================================
// GET ALL PRODUCTS
// Everyone
// ===================================

router.get(
    "/",
    getProducts
);


// ===================================
// GET ONE PRODUCT
// Everyone
// IMPORTANT: before admin routes
// ===================================

router.get(
    "/:id",
    getProductById
);


// ===================================
// CREATE PRODUCT
// Admin Only
// ===================================

router.post(
    "/",
    authenticateToken,
    isAdmin("admin"),
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
    isAdmin("admin"),
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
    isAdmin("admin"),
    removeProduct
);


module.exports = router;