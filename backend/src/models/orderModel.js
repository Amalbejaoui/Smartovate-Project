const { getPool } = require("../config/db");


// ===================================
// CREATE ORDER
// ===================================
async function createOrder(userId) {

    const pool = await getPool();
    // ===================================
    // 1. GET USER CART
    // ===================================

    const cartResult = await pool
        .request()
        .input("userId", userId)
        .query(`
            SELECT
                ci.id AS cartItemId,
                ci.productId,
                ci.quantity,
                p.name,
                p.price,
                p.stock,
                p.isActive
            FROM CartItems ci

                     INNER JOIN Products p
                                ON p.id = ci.productId

            WHERE ci.userId = @userId
        `);

    const items = cartResult.recordset;


    // ===================================
    // 2. CHECK CART
    // ===================================

    if (items.length === 0) {

        throw new Error("Cart is empty.");

    }


    // ===================================
    // 3. CHECK STOCK + CALCULATE TOTAL
    // ===================================

    let total = 0;


    for (const item of items) {

        // Product inactive
        if (item.isActive === false || item.isActive === 0) {

            throw new Error(
                `Product "${item.name}" is no longer available.`
            );

        }


        // Not enough stock
        if (item.stock < item.quantity) {

            throw new Error(
                `Not enough stock for product: ${item.name}`
            );

        }


        total +=
            Number(item.price) *
            Number(item.quantity);

    }


    // ===================================
    // 4. CREATE ORDER
    // ===================================

    const orderResult = await pool
        .request()
        .input("userId", userId)
        .input("total", total)
        .query(`
            INSERT INTO Orders
            (
                userId,
                total,
                status
            )

                OUTPUT INSERTED.*

            VALUES
                (
                @userId,
                @total,
                'Pending'
                )
        `);


    const order = orderResult.recordset[0];


    // ===================================
    // 5. CREATE ORDER ITEMS
    // ===================================

    for (const item of items) {

        await pool
            .request()
            .input("orderId", order.id)
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


        // ===================================
        // 6. UPDATE PRODUCT STOCK
        // ===================================

        await pool
            .request()
            .input("productId", item.productId)
            .input("quantity", item.quantity)
            .query(`
                UPDATE Products

                SET stock = stock - @quantity

                WHERE id = @productId
            `);

    }


    // ===================================
    // 7. EMPTY CART
    // ===================================

    await pool
        .request()
        .input("userId", userId)
        .query(`
            DELETE FROM CartItems

            WHERE userId = @userId
        `);


    // ===================================
    // 8. RETURN ORDER
    // ===================================

    return order;

}



// ===================================
// GET MY ORDERS
// ===================================

async function getMyOrders(userId) {

    const pool = await getPool();
    const result = await pool
        .request()
        .input("userId", userId)
        .query(`
            SELECT

                o.id AS orderId,

                o.userId,

                o.total,

                o.status,

                o.createdAt,

                oi.id AS orderItemId,

                oi.productId,

                oi.quantity,

                oi.price,

                p.name AS productName,

                p.imageUrl AS productImage

            FROM Orders o

                     INNER JOIN OrderItems oi
                                ON o.id = oi.orderId

                     INNER JOIN Products p
                                ON oi.productId = p.id

            WHERE o.userId = @userId

            ORDER BY o.createdAt DESC
        `);

    return result.recordset;

}



// ===================================
// GET ALL ORDERS - ADMIN
// ===================================

async function getAllOrders() {

    const pool = await getPool();
    const result = await pool
        .request()
        .query(`
            SELECT

                o.id AS orderId,

                o.userId,

                u.fullName AS customerName,

                u.email AS customerEmail,

                o.total,

                o.status,

                o.createdAt,

                oi.id AS orderItemId,

                oi.productId,

                oi.quantity,

                oi.price,

                p.name AS productName,

                p.imageUrl AS productImage

            FROM Orders o

                     INNER JOIN Users u
                                ON o.userId = u.id

                     INNER JOIN OrderItems oi
                                ON o.id = oi.orderId

                     INNER JOIN Products p
                                ON oi.productId = p.id

            ORDER BY o.createdAt DESC
        `);

    return result.recordset;

}



// ===================================
// UPDATE ORDER STATUS
// ===================================

async function updateStatus(id, status) {

    const pool = await getPool();
    const result = await pool
        .request()
        .input("id", id)
        .input("status", status)
        .query(`
            UPDATE Orders

            SET status = @status

            WHERE id = @id
        `);

    return result.rowsAffected[0] > 0;

}



module.exports = {

    createOrder,
    getMyOrders,
    getAllOrders,
    updateStatus

};