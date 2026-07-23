const sql = require("mssql");
const { poolPromise } = require("../config/db");

// =======================================
// CREATE ORDER FROM CART
// =======================================
async function createOrder(userId) {

    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {

        await transaction.begin();

        // ==========================
        // GET CART
        // ==========================
        const cartResult = await new sql.Request(transaction)
            .input("userId", userId)
            .query(`
                SELECT
                    CartItems.productId,
                    CartItems.quantity,
                    Products.name,
                    Products.price,
                    Products.stock
                FROM CartItems
                         INNER JOIN Products
                                    ON CartItems.productId = Products.id
                WHERE CartItems.userId=@userId
            `);

        const items = cartResult.recordset;

        if (items.length === 0) {
            throw new Error("Cart is empty.");
        }

        // ==========================
        // CHECK STOCK + TOTAL
        // ==========================
        let total = 0;

        for (const item of items) {

            if (item.stock < item.quantity) {
                throw new Error(
                    `${item.name} has only ${item.stock} items left in stock.`
                );
            }

            total += item.price * item.quantity;
        }

        // ==========================
        // CREATE ORDER
        // ==========================
        const orderResult = await new sql.Request(transaction)
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

        const orderId = orderResult.recordset[0].id;

        // ==========================
        // INSERT ORDER ITEMS
        // ==========================
        for (const item of items) {

            await new sql.Request(transaction)
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

            // ==========================
            // UPDATE STOCK
            // ==========================
            await new sql.Request(transaction)
                .input("productId", item.productId)
                .input("quantity", item.quantity)
                .query(`
                    UPDATE Products
                    SET stock = stock - @quantity
                    WHERE id=@productId
                `);

        }

        // ==========================
        // EMPTY CART
        // ==========================
        await new sql.Request(transaction)
            .input("userId", userId)
            .query(`
                DELETE FROM CartItems
                WHERE userId=@userId
            `);

        await transaction.commit();

        return {
            orderId,
            total
        };

    } catch (error) {

        await transaction.rollback();

        throw error;

    }

}



// =======================================
// GET MY ORDERS
// =======================================
async function getMyOrders(userId) {

    const pool = await poolPromise;

    const result = await pool.request()
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
// GET ALL ORDERS
// =======================================
async function getAllOrders() {

    const pool = await poolPromise;

    const result = await pool.request()
        .query(`
            SELECT
                Orders.*,
                Users.fullName,
                Users.email
            FROM Orders
                     INNER JOIN Users
                                ON Orders.userId = Users.id
            ORDER BY Orders.createdAt DESC
        `);

    return result.recordset;

}



// =======================================
// UPDATE ORDER STATUS
// =======================================
async function updateStatus(id, status) {

    const pool = await poolPromise;

    await pool.request()
        .input("id", id)
        .input("status", status)
        .query(`
            UPDATE Orders
            SET status=@status
            WHERE id=@id
        `);

    return true;
}

module.exports = {

    createOrder,
    getMyOrders,
    getAllOrders,
    updateStatus

};