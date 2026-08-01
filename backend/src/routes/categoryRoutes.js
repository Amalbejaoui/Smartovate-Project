const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
    getCategories,
    addCategory,
    removeCategory
} = require("../controllers/categoryController");


// ===================================
// GET ALL CATEGORIES
// Everyone can view
// ===================================

router.get("/", getCategories);


// ===================================
// ADD CATEGORY
// Admin only
// ===================================

router.post(
    "/",
    authenticateToken,
    isAdmin("admin"),
    addCategory
);


// ===================================
// DELETE CATEGORY
// Admin only
// ===================================

router.delete(
    "/:id",
    authenticateToken,
    isAdmin("admin"),
    removeCategory
);


module.exports = router;