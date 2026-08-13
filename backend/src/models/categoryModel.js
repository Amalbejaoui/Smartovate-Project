const { getPool } = require("../config/db");

// ==============================
// GET ALL CATEGORIES
// ==============================
async function getAllCategories() {

    const pool = await getPool;

    const result = await pool
        .request()
        .query(`
            SELECT *
            FROM Categories
            ORDER BY id ASC
        `);

    return result.recordset;
}


// ==============================
// CREATE CATEGORY
// ==============================
async function createCategory(name) {

    const pool = await getPool;

    const result = await pool
        .request()
        .input("name", name)
        .query(`
            INSERT INTO Categories (name)

                OUTPUT INSERTED.*

            VALUES (@name)
        `);

    return result.recordset[0];
}


// ==============================
// DELETE CATEGORY
// ==============================
async function deleteCategory(id) {

    const pool = await getPool;

    await pool
        .request()
        .input("id", id)
        .query(`
            DELETE FROM Categories
            WHERE id=@id
        `);

    return true;
}


module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory
};