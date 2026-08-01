import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ProductReviews.css";

function ProductReviews({ productId }) {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [submitting, setSubmitting] = useState(false);


    const token = localStorage.getItem("token");



    // =====================================
    // LOAD REVIEWS
    // =====================================

    const loadReviews = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                `/reviews/product/${productId}`
            );

            setReviews(
                response.data.data || []
            );

        } catch (error) {

            console.log(
                "Error loading reviews:",
                error
            );

            setReviews([]);

        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        if (productId) {

            loadReviews();

        }

    }, [productId]);



    // =====================================
    // ADD REVIEW
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!token) {

            alert(
                "Please login first to leave a review ❤️"
            );

            return;

        }


        if (!rating) {

            alert("Please select a rating.");

            return;

        }


        try {

            setSubmitting(true);


            await api.post(
                "/reviews",
                {
                    productId,
                    rating,
                    comment
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            alert(
                "Your review has been added successfully ✨"
            );


            setRating(5);

            setComment("");


            loadReviews();


        } catch (error) {

            console.log(
                "Add review error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to add review."
            );

        } finally {

            setSubmitting(false);

        }

    };



    // =====================================
    // DELETE REVIEW
    // =====================================

    const handleDelete = async (reviewId) => {

        if (!window.confirm(
            "Are you sure you want to delete this review?"
        )) {

            return;

        }


        try {

            await api.delete(
                `/reviews/${reviewId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            loadReviews();


        } catch (error) {

            console.log(
                "Delete review error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to delete review."
            );

        }

    };



    // =====================================
    // STARS
    // =====================================

    const renderStars = (value) => {

        return (

            <div className="review-stars">

                {[1, 2, 3, 4, 5].map(
                    star => (

                        <span
                            key={star}
                            className={
                                star <= value
                                    ? "star active"
                                    : "star"
                            }
                        >
                            ★
                        </span>

                    )
                )}

            </div>

        );

    };



    return (

        <section className="product-reviews">


            {/* =================================
                HEADER
            ================================= */}

            <div className="reviews-header">

                <h2>
                    Customer Reviews
                </h2>

                <span>
                    {reviews.length} review
                    {reviews.length !== 1
                        ? "s"
                        : ""}
                </span>

            </div>



            {/* =================================
                ADD REVIEW
            ================================= */}

            <div className="review-form-card">

                <h3>
                    Leave a review ✨
                </h3>


                <form onSubmit={handleSubmit}>


                    {/* RATING */}

                    <div className="rating-input">

                        <label>
                            Your rating
                        </label>


                        <div className="rating-stars">

                            {[1, 2, 3, 4, 5].map(
                                star => (

                                    <button
                                        type="button"
                                        key={star}
                                        className={
                                            star <= rating
                                                ? "rating-star selected"
                                                : "rating-star"
                                        }
                                        onClick={() =>
                                            setRating(star)
                                        }
                                    >
                                        ★
                                    </button>

                                )
                            )}

                        </div>

                    </div>



                    {/* COMMENT */}

                    <div className="comment-input">

                        <label>
                            Your comment
                        </label>


                        <textarea

                            value={comment}

                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
                            }

                            placeholder="Tell us what you think about this product..."

                            rows="4"

                            maxLength="500"

                        />

                    </div>



                    <button
                        type="submit"
                        className="submit-review-btn"
                        disabled={submitting}
                    >

                        {submitting
                            ? "Submitting..."
                            : "Submit Review ✨"}

                    </button>


                </form>

            </div>



            {/* =================================
                REVIEWS LIST
            ================================= */}

            <div className="reviews-list">


                {loading ? (

                    <div className="reviews-loading">
                        Loading reviews...
                    </div>

                ) : reviews.length === 0 ? (

                    <div className="no-reviews">

                        <div>
                            ⭐
                        </div>

                        <h3>
                            No reviews yet
                        </h3>

                        <p>
                            Be the first customer
                            to review this product.
                        </p>

                    </div>

                ) : (

                    reviews.map(review => (

                        <div
                            className="review-card"
                            key={review.id}
                        >


                            <div className="review-top">


                                <div className="review-user">

                                    <div className="user-avatar">

                                        {review.customerName
                                            ?.charAt(0)
                                            ?.toUpperCase()}

                                    </div>


                                    <div>

                                        <strong>
                                            {review.customerName}
                                        </strong>

                                        <span>

                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString(
                                                "en-GB"
                                            )}

                                        </span>

                                    </div>

                                </div>


                                {renderStars(
                                    review.rating
                                )}

                            </div>



                            {review.comment && (

                                <p className="review-comment">

                                    {review.comment}

                                </p>

                            )}



                            {/* Delete only for current user */}

                            {(() => {

                                try {

                                    const user =
                                        JSON.parse(
                                            localStorage.getItem(
                                                "user"
                                            )
                                        );


                                    if (
                                        user &&
                                        user.id === review.userId
                                    ) {

                                        return (

                                            <button
                                                className="delete-review-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        review.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        );

                                    }

                                } catch (error) {

                                    return null;

                                }

                                return null;

                            })()}


                        </div>

                    ))

                )}

            </div>


        </section>

    );

}


export default ProductReviews;