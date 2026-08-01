const Review = require("../models/reviewModel");


// =====================================
// ADD REVIEW - CLIENT
// =====================================

async function addReview(req, res) {

    try {

        const userId = req.user.id;

        const {
            productId,
            rating,
            comment
        } = req.body;


        if (!productId) {

            return res.status(400).json({
                success: false,
                message: "Product is required."
            });

        }


        if (!rating) {

            return res.status(400).json({
                success: false,
                message: "Rating is required."
            });

        }


        if (rating < 1 || rating > 5) {

            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5."
            });

        }


        const review = await Review.addReview(
            userId,
            productId,
            rating,
            comment
        );


        res.status(201).json({

            success: true,

            message: "Review added successfully.",

            data: review

        });


    } catch (error) {

        console.log("ADD REVIEW ERROR:", error);

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

}



// =====================================
// GET PRODUCT REVIEWS
// PUBLIC
// =====================================

async function getProductReviews(req, res) {

    try {

        const productId = req.params.productId;

        const reviews =
            await Review.getProductReviews(productId);


        res.status(200).json({

            success: true,

            data: reviews

        });


    } catch (error) {

        console.log("GET REVIEWS ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Error loading reviews."

        });

    }

}



// =====================================
// GET ALL REVIEWS
// ADMIN
// =====================================

async function getAllReviews(req, res) {

    try {

        const reviews =
            await Review.getAllReviews();


        res.status(200).json({

            success: true,

            data: reviews

        });


    } catch (error) {

        console.log("GET ALL REVIEWS ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Error loading reviews."

        });

    }

}



// =====================================
// DELETE REVIEW
// CLIENT / ADMIN
// =====================================

async function deleteReview(req, res) {

    try {

        const reviewId = req.params.id;

        const userId = req.user.id;

        const isAdmin = req.user.role === "admin";


        const deleted =
            await Review.deleteReview(
                reviewId,
                userId,
                isAdmin
            );


        if (!deleted) {

            return res.status(404).json({

                success: false,

                message: "Review not found or unauthorized."

            });

        }


        res.status(200).json({

            success: true,

            message: "Review deleted successfully."

        });


    } catch (error) {

        console.log("DELETE REVIEW ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Error deleting review."

        });

    }

}



// =====================================
// UPDATE REVIEW
// CLIENT
// =====================================

async function updateReview(req, res) {

    try {

        const reviewId = req.params.id;

        const userId = req.user.id;

        const {
            rating,
            comment
        } = req.body;


        if (!rating) {

            return res.status(400).json({

                success: false,

                message: "Rating is required."

            });

        }


        if (rating < 1 || rating > 5) {

            return res.status(400).json({

                success: false,

                message: "Rating must be between 1 and 5."

            });

        }


        const updated =
            await Review.updateReview(
                reviewId,
                userId,
                rating,
                comment
            );


        if (!updated) {

            return res.status(404).json({

                success: false,

                message: "Review not found or unauthorized."

            });

        }


        res.status(200).json({

            success: true,

            message: "Review updated successfully."

        });


    } catch (error) {

        console.log("UPDATE REVIEW ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Error updating review."

        });

    }

}



module.exports = {

    addReview,
    getProductReviews,
    getAllReviews,
    deleteReview,
    updateReview

};