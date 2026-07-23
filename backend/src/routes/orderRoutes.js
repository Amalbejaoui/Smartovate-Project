const express = require("express");

const router = express.Router();

const authenticateToken =
    require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/adminMiddleware");

const {

    createOrder,
    getMyOrders,
    getAllOrders,
    updateStatus

} = require("../controllers/orderController");


// =======================================
// CLIENT
// =======================================

// Checkout
router.post(
    "/",
    authenticateToken,
    authorizeRoles("client", "admin"),
    createOrder
);


// My Orders
router.get(
    "/my",
    authenticateToken,
    authorizeRoles("client", "admin"),
    getMyOrders
);


// =======================================
// ADMIN
// =======================================

// All Orders
router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    getAllOrders
);


// Update Status
router.put(
    "/:id/status",
    authenticateToken,
    authorizeRoles("admin"),
    updateStatus
);

module.exports = router;