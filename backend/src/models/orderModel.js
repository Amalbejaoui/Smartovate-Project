const { poolPromise } = require("../config/db");


// =======================================
// CREATE ORDER FROM CART
// =======================================
async function createOrder(userId) {

    const pool = await poolPromise;

    // Get Cart
    const cart = await pool
        .request()
        .input("userId", userId)
        .query(`
            SELECT
                CartItems.productId,
                CartItems.quantity,
                Products.price
            FROM CartItems
            INNER JOIN Products
            ON CartItems.productId = Products.id
            WHERE CartItems.userId=@userId
        `);

    const items = cart.recordset;

    if (items.length === 0) {
        throw new Error("Cart is empty");
    }


    // Calculate Total
    let total = 0;

    items.forEach(item => {
        total += item.price * item.quantity;
    });


    // Create Order
    const order = await pool
        .request()
        .input("userId", userId)
        .input("total", total)
        .query(`
            INSERT INTO Orders
            (
                userId,
                total
            )

            OUTPUT INSERTED.id

            VALUES
            (
                @userId,
                @total
            )
        `);

    const orderId = order.recordset[0].id;


    // Insert Order Items
    for (const item of items) {

        await pool
            .request()
            .input("orderId", orderId)
            .input("productId", item.productId)
            .input("quantity", item.quantity)
            .input("price", item.price)
            .query(`
                INSERT INTO OrderItems
                (
                    orderId,
                    productId,
                    quantity,
                    price
                )

                VALUES
                (
                    @orderId,
                    @productId,
                    @quantity,
                    @price
                )
            `);

    }


    // Empty Cart
    await pool
        .request()
        .input("userId", userId)
        .query(`
            DELETE FROM CartItems
            WHERE userId=@userId
        `);

    return orderId;

}



// =======================================
// GET MY ORDERS
// =======================================
async function getMyOrders(userId) {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("userId", userId)
        .query(`
            SELECT *
            FROM Orders
            WHERE userId=@userId
            ORDER BY createdAt DESC
        `);

    return result.recordset;

}



// =======================================
// GET ALL ORDERS (ADMIN)
// =======================================
async function getAllOrders() {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .query(`
            SELECT *
            FROM Orders
            ORDER BY createdAt DESC
        `);

    return result.recordset;

}



// =======================================
// UPDATE STATUS
// =======================================
async function updateStatus(id, status) {

    const pool = await poolPromise;

    await pool
        .request()
        .input("id", id)
        .input("status", status)
        .query(`
            UPDATE Orders
            SET status=@status
            WHERE id=@id
        `);

}



module.exports = {

    createOrder,
    getMyOrders,
    getAllOrders,
    updateStatus

};