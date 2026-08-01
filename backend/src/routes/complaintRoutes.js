const express = require("express");

const router = express.Router();

const authenticateToken =
    require("../middleware/authMiddleware");

const isAdmin =
    require("../middleware/adminMiddleware");

const {

    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaint,
    deleteComplaint

} = require("../controllers/complaintController");


// =====================================
// CREATE COMPLAINT
// CLIENT
// =====================================

router.post(
    "/",
    authenticateToken,
    createComplaint
);


// =====================================
// GET MY COMPLAINTS
// CLIENT
// =====================================

router.get(
    "/my",
    authenticateToken,
    getMyComplaints
);


// =====================================
// GET ALL COMPLAINTS
// ADMIN
// =====================================

router.get(
    "/",
    authenticateToken,
    isAdmin("admin"),
    getAllComplaints
);


// =====================================
// UPDATE COMPLAINT
// ADMIN
// =====================================

router.put(
    "/:id",
    authenticateToken,
    isAdmin("admin"),
    updateComplaint
);


// =====================================
// DELETE COMPLAINT
// ADMIN
// =====================================

router.delete(
    "/:id",
    authenticateToken,
    isAdmin("admin"),
    deleteComplaint
);


module.exports = router;