const express = require("express");

const router = express.Router();

const authenticateToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/adminMiddleware");

const {

    createOrder,
    getMyOrders,
    getAllOrders,
    updateStatus

} = require("../controllers/orderController");


// CLIENT
router.post(
    "/",
    authenticateToken,
    createOrder
);

router.get(
    "/my",
    authenticateToken,
    getMyOrders
);


// ADMIN
router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    getAllOrders
);

router.put(
    "/:id/status",
    authenticateToken,
    authorizeRoles("admin"),
    updateStatus
);

module.exports = router;