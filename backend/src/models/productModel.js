const { poolPromise } = require("../config/db");


// ==============================
// GET ALL PRODUCTS
// ==============================
async function getAllProducts() {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .query(`
            SELECT *
            FROM Products
            ORDER BY id DESC
        `);

    return result.recordset;
}


// ==============================
// GET PRODUCT BY ID
// ==============================
async function getProductById(id) {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("id", id)
        .query(`
            SELECT *
            FROM Products
            WHERE id = @id
        `);

    if (result.recordset.length === 0) {

        return null;

    }

    return result.recordset[0];
}


// ==============================
// CREATE PRODUCT
// ==============================
async function createProduct(product) {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("name", product.name)
        .input("description", product.description)
        .input("price", product.price)
        .input("stock", product.stock)
        .input("imageUrl", product.imageUrl)
        .input("categoryId", product.categoryId || null)
        .query(`
            INSERT INTO Products
            (
                name,
                description,
                price,
                stock,
                imageUrl,
                categoryId
            )
                OUTPUT INSERTED.*
            VALUES
                (
                @name,
                @description,
                @price,
                @stock,
                @imageUrl,
                @categoryId
                )
        `);

    return result.recordset[0];
}


// ==============================
// UPDATE PRODUCT
// ==============================
async function updateProduct(id, product) {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("id", id)
        .input("name", product.name)
        .input("description", product.description)
        .input("price", product.price)
        .input("stock", product.stock)
        .input("imageUrl", product.imageUrl)
        .input("categoryId", product.categoryId || null)
        .query(`
            UPDATE Products
            SET
                name = @name,
                description = @description,
                price = @price,
                stock = @stock,
                imageUrl = @imageUrl,
                categoryId = @categoryId
            WHERE id = @id;

            SELECT *
            FROM Products
            WHERE id = @id;
        `);

    return result.recordset[0];
}


// ==============================
// DELETE PRODUCT
// ==============================
async function deleteProduct(id) {

    const pool = await poolPromise;

    try {

        // ==================================
        // 1. Remove product from carts
        // ==================================

        await pool
            .request()
            .input("id", id)
            .query(`
                DELETE FROM CartItems
                WHERE productId = @id
            `);


        // ==================================
        // 2. Check if product exists
        // ==================================

        const product = await pool
            .request()
            .input("id", id)
            .query(`
                SELECT id
                FROM Products
                WHERE id = @id
            `);


        if (product.recordset.length === 0) {

            return false;

        }


        // ==================================
        // 3. Check if product is used in orders
        // ==================================

        const orderItems = await pool
            .request()
            .input("id", id)
            .query(`
                SELECT TOP 1 id
                FROM OrderItems
                WHERE productId = @id
            `);


        // ==================================
        // 4. Product belongs to old order
        // ==================================

        if (orderItems.recordset.length > 0) {

            throw new Error(
                "This product cannot be permanently deleted because it belongs to an existing order."
            );

        }


        // ==================================
        // 5. Delete product
        // ==================================

        await pool
            .request()
            .input("id", id)
            .query(`
                DELETE FROM Products
                WHERE id = @id
            `);


        return true;

    } catch (error) {

        console.error(
            "DELETE PRODUCT ERROR:",
            error
        );

        throw error;

    }

}


// ==============================
// EXPORT
// ==============================

module.exports = {

    getAllProducts,

    getProductById,

    createProduct,

    updateProduct,

    deleteProduct

};