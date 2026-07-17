const express = require("express");
const router = express.Router();
const validateProduct = require("../middleware/productValidation");

const {
    getProducts,
    addProduct,
    updateProduct,
    removeProduct
} = require("../controllers/productController");

// GET all
router.get("/", getProducts);


// POST create
router.post("/", validateProduct, addProduct);

// PUT update
router.put("/:id", validateProduct, updateProduct);

// DELETE remove
router.delete("/:id", removeProduct);



module.exports = router;