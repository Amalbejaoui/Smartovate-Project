import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminReviews.css";

function AdminReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");


    // ==============================
    // LOAD ALL REVIEWS
    // ==============================

    const loadReviews = async () => {

        try {

            setLoading(true);

            const response = await api.get("/reviews", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Reviews:", response.data);

            setReviews(response.data.data || []);

        } catch (error) {

            console.log("Error loading reviews:", error);

            setReviews([]);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadReviews();

    }, []);


    // ==============================
    // DELETE REVIEW
    // ==============================

    const deleteReview = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/reviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Review deleted successfully ✨");

            loadReviews();

        } catch (error) {

            console.log("Delete review error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete review."
            );

        }

    };


    // ==============================
    // STARS
    // ==============================

    const renderStars = (rating) => {

        return (

            <div className="admin-review-stars">

                {[1, 2, 3, 4, 5].map((star) => (

                    <span
                        key={star}
                        className={
                            star <= rating
                                ? "active"
                                : ""
                        }
                    >
                        ★
                    </span>

                ))}

            </div>

        );

    };


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (

            <div className="admin-reviews-page">

                <div className="admin-reviews-loading">

                    Loading reviews... ⭐

                </div>

            </div>

        );

    }


    return (

        <div className="admin-reviews-page">


            {/* HEADER */}

            <div className="admin-reviews-header">

                <div>

                    <h1>
                        Customer Reviews ⭐
                    </h1>

                    <p>
                        Manage reviews and customer feedback
                    </p>

                </div>

                <div className="reviews-count">

                    {reviews.length} Reviews

                </div>

            </div>


            {/* EMPTY */}

            {reviews.length === 0 ? (

                <div className="admin-no-reviews">

                    <div className="admin-empty-icon">
                        ⭐
                    </div>

                    <h2>
                        No reviews yet
                    </h2>

                    <p>
                        Customer reviews will appear here.
                    </p>

                </div>

            ) : (

                <div className="admin-reviews-list">

                    {reviews.map((review) => (

                        <div
                            className="admin-review-card"
                            key={review.id}
                        >


                            {/* TOP */}

                            <div className="admin-review-top">


                                <div className="admin-review-user">

                                    <div className="admin-user-avatar">

                                        {review.customerName
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"}

                                    </div>


                                    <div>

                                        <strong>
                                            {review.customerName}
                                        </strong>

                                        <span>
                                            {review.customerEmail}
                                        </span>

                                    </div>

                                </div>


                                <div>

                                    {renderStars(review.rating)}

                                </div>

                            </div>


                            {/* PRODUCT */}

                            <div className="admin-review-product">

                                {review.productImage ? (

                                    <img
                                        src={review.productImage}
                                        alt={review.productName}
                                    />

                                ) : (

                                    <div className="admin-product-placeholder">
                                        🛍️
                                    </div>

                                )}


                                <div>

                                    <span>
                                        Product
                                    </span>

                                    <strong>
                                        {review.productName}
                                    </strong>

                                </div>

                            </div>


                            {/* COMMENT */}

                            <div className="admin-review-comment">

                                <span>
                                    Customer comment
                                </span>

                                <p>

                                    {review.comment ||
                                        "No comment provided."}

                                </p>

                            </div>


                            {/* BOTTOM */}

                            <div className="admin-review-bottom">

                                <span>

                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString("en-GB")}

                                </span>


                                <button
                                    className="delete-review-admin-btn"
                                    onClick={() =>
                                        deleteReview(review.id)
                                    }
                                >
                                    Delete Review 🗑️
                                </button>

                            </div>


                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default AdminReviews;