const express = require("express");

const router = express.Router();

const authenticateToken =
    require("../middleware/authMiddleware");

const isAdmin =
    require("../middleware/adminMiddleware");

const {

    addReview,
    getProductReviews,
    getAllReviews,
    deleteReview,
    updateReview

} = require("../controllers/reviewController");


// =====================================
// GET REVIEWS OF PRODUCT
// Everyone can see
// =====================================

router.get(
    "/product/:productId",
    getProductReviews
);


// =====================================
// ADD REVIEW
// Client only
// =====================================

router.post(
    "/",
    authenticateToken,
    addReview
);


// =====================================
// UPDATE REVIEW
// Client only
// Own review
// =====================================

router.put(
    "/:id",
    authenticateToken,
    updateReview
);


// =====================================
// DELETE REVIEW
// Client own review
// OR ADMIN
// =====================================

router.delete(
    "/:id",
    authenticateToken,
    deleteReview
);


// =====================================
// GET ALL REVIEWS
// ADMIN ONLY
// =====================================

router.get(
    "/",
    authenticateToken,
    isAdmin("admin"),
    getAllReviews
);


module.exports = router;