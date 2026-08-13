const { getPool } = require("../config/db");


// =====================================
// ADD REVIEW
// =====================================

async function addReview(userId, productId, rating, comment) {

    const pool = await getPool;

    // Check product exists
    const productResult = await pool
        .request()
        .input("productId", productId)
        .query(`
            SELECT id
            FROM Products
            WHERE id = @productId
        `);

    if (productResult.recordset.length === 0) {

        throw new Error("Product not found.");

    }


    // Check if user already reviewed this product
    const existingReview = await pool
        .request()
        .input("userId", userId)
        .input("productId", productId)
        .query(`
            SELECT id
            FROM Reviews
            WHERE userId = @userId
              AND productId = @productId
        `);


    if (existingReview.recordset.length > 0) {

        throw new Error(
            "You have already reviewed this product."
        );

    }


    // Add review
    const result = await pool
        .request()
        .input("userId", userId)
        .input("productId", productId)
        .input("rating", rating)
        .input("comment", comment || null)
        .query(`
            INSERT INTO Reviews
            (
                userId,
                productId,
                rating,
                comment
            )

                OUTPUT INSERTED.*

            VALUES
                (
                @userId,
                @productId,
                @rating,
                @comment
                )
        `);


    return result.recordset[0];

}



// =====================================
// GET PRODUCT REVIEWS
// =====================================

async function getProductReviews(productId) {

    const pool = await getPool;

    const result = await pool
        .request()
        .input("productId", productId)
        .query(`
            SELECT

                r.id,

                r.userId,

                u.fullName AS customerName,

                r.productId,

                p.name AS productName,

                r.rating,

                r.comment,

                r.createdAt

            FROM Reviews r

                     INNER JOIN Users u
                                ON r.userId = u.id

                     INNER JOIN Products p
                                ON r.productId = p.id

            WHERE r.productId = @productId

            ORDER BY r.createdAt DESC
        `);


    return result.recordset;

}



// =====================================
// GET ALL REVIEWS - ADMIN
// =====================================

async function getAllReviews() {

    const pool = await getPool;

    const result = await pool
        .request()
        .query(`
            SELECT

                r.id,

                r.userId,

                u.fullName AS customerName,

                u.email AS customerEmail,

                r.productId,

                p.name AS productName,

                p.imageUrl AS productImage,

                r.rating,

                r.comment,

                r.createdAt

            FROM Reviews r

                     INNER JOIN Users u
                                ON r.userId = u.id

                     INNER JOIN Products p
                                ON r.productId = p.id

            ORDER BY r.createdAt DESC
        `);


    return result.recordset;

}



// =====================================
// DELETE REVIEW
// =====================================

async function deleteReview(reviewId, userId, isAdmin = false) {

    const pool = await getPool;


    // Admin can delete any review
    if (isAdmin) {

        const result = await pool
            .request()
            .input("id", reviewId)
            .query(`
                DELETE FROM Reviews
                WHERE id = @id
            `);

        return result.rowsAffected[0] > 0;

    }


    // Client can delete only his own review
    const result = await pool
        .request()
        .input("id", reviewId)
        .input("userId", userId)
        .query(`
            DELETE FROM Reviews
            WHERE id = @id
              AND userId = @userId
        `);


    return result.rowsAffected[0] > 0;

}



// =====================================
// UPDATE REVIEW
// =====================================

async function updateReview(
    reviewId,
    userId,
    rating,
    comment
) {

    const pool = await getPool;

    const result = await pool
        .request()
        .input("id", reviewId)
        .input("userId", userId)
        .input("rating", rating)
        .input("comment", comment || null)
        .query(`
            UPDATE Reviews

            SET
                rating = @rating,
                comment = @comment

            WHERE id = @id
            AND userId = @userId
        `);


    return result.rowsAffected[0] > 0;

}



module.exports = {

    addReview,
    getProductReviews,
    getAllReviews,
    deleteReview,
    updateReview

};