const { poolPromise } = require("../config/db");

// ==============================
// GET ALL PRODUCTS
// ==============================
async function getAllProducts() {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .query("SELECT * FROM Products ORDER BY id DESC");

    return result.recordset;
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
        .query(`
            INSERT INTO Products
            (name, description, price, stock, imageUrl)

            OUTPUT INSERTED.id

            VALUES
            (@name, @description, @price, @stock, @imageUrl)
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
        .query(` UPDATE Products
            SET
                name=@name,
                description=@description,
                price=@price,
                stock=@stock,
                imageUrl=@imageUrl
            WHERE id=@id;

            SELECT * FROM Products
            WHERE id=@id;
        `);

    return result.recordset[0];
}


// ==============================
// DELETE PRODUCT
// ==============================
async function deleteProduct(id) {

    const pool = await poolPromise;

    await pool
        .request()
        .input("id", id)
        .query(`DELETE FROM Products
            WHERE id=@id
        `);

    return true;
}


module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};