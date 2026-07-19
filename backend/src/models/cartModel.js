const { poolPromise } = require("../config/db");


// =====================================
// ADD PRODUCT TO CART
// =====================================
async function addToCart(userId, productId, quantity) {

    const pool = await poolPromise;

    // Check if product already exists in cart
    const existing = await pool
        .request()
        .input("userId", userId)
        .input("productId", productId)
        .query(`
            SELECT *
            FROM CartItems
            WHERE userId=@userId
              AND productId=@productId
        `);

    if (existing.recordset.length > 0) {

        await pool
            .request()
            .input("userId", userId)
            .input("productId", productId)
            .input("quantity", quantity)
            .query(`
                UPDATE CartItems
                SET quantity = quantity + @quantity
                WHERE userId=@userId
                  AND productId=@productId
            `);

        return;
    }

    await pool
        .request()
        .input("userId", userId)
        .input("productId", productId)
        .input("quantity", quantity)
        .query(`
            INSERT INTO CartItems
            (
                userId,
                productId,
                quantity
            )
            VALUES
                (
                    @userId,
                    @productId,
                    @quantity
                )
        `);

}



// =====================================
// GET USER CART
// =====================================
async function getCart(userId) {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("userId", userId)
        .query(`
            SELECT

                CartItems.id,
                Products.name,
                Products.price,
                Products.imageUrl,
                CartItems.quantity

            FROM CartItems

                     INNER JOIN Products
                                ON CartItems.productId = Products.id

            WHERE CartItems.userId=@userId
        `);

    return result.recordset;
}



// =====================================
// REMOVE ITEM
// =====================================
async function removeFromCart(id) {

    const pool = await poolPromise;

    await pool
        .request()
        .input("id", id)
        .query(`
            DELETE FROM CartItems
            WHERE id=@id
        `);

}

module.exports = {

    addToCart,
    getCart,
    removeFromCart

};