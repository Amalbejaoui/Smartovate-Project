const { poolPromise } = require("./db");

async function initializeDatabase() {
    try {

        const pool = await poolPromise;

        await pool.request().query(`
            IF NOT EXISTS (
                SELECT * FROM sysobjects
                WHERE name='Products' AND xtype='U'
            )
            CREATE TABLE Products (
                id INT IDENTITY(1,1) PRIMARY KEY,
                name NVARCHAR(100) NOT NULL,
                description NVARCHAR(500),
                price DECIMAL(10,2) NOT NULL,
                stock INT NOT NULL,
                imageUrl NVARCHAR(255),
                createdAt DATETIME DEFAULT GETDATE()
            );
        `);

        console.log("Products table is ready.");

    } catch (error) {

        console.error("Error creating table:", error);

    }
}

module.exports = initializeDatabase;