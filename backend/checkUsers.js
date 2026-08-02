const { poolPromise } = require("./src/config/db");

async function checkUsers() {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT id, fullName, email, role
            FROM Users
            ORDER BY id
        `);

        console.table(result.recordset);

        process.exit(0);

    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
}

checkUsers();