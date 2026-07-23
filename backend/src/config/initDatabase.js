const { poolPromise } = require("./db");

async function initializeDatabase() {

    try {

        const pool = await poolPromise;

        // =====================================
        // PRODUCTS TABLE
        // =====================================
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



        // =====================================
        // USERS TABLE
        // =====================================
        await pool.request().query(`
            IF NOT EXISTS (
                SELECT * FROM sysobjects
                WHERE name='Users' AND xtype='U'
            )

            CREATE TABLE Users (

                id INT IDENTITY(1,1) PRIMARY KEY,

                fullName NVARCHAR(100) NOT NULL,

                email NVARCHAR(100) NOT NULL UNIQUE,

                password NVARCHAR(255) NOT NULL,

                role NVARCHAR(20) NOT NULL DEFAULT 'client',

                createdAt DATETIME DEFAULT GETDATE()

            );
        `);

        console.log("Users table is ready.");
        // =====================================
// CART TABLE
// =====================================

        await pool.request().query(`

IF NOT EXISTS (
    SELECT *
    FROM sysobjects
    WHERE name='CartItems'
    AND xtype='U'
)

CREATE TABLE CartItems(

    id INT IDENTITY(1,1) PRIMARY KEY,

    userId INT NOT NULL,

    productId INT NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    createdAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY(userId) REFERENCES Users(id),

    FOREIGN KEY(productId) REFERENCES Products(id)

);

`);

        console.log("CartItems table is ready.");
        // =====================================
// ORDERS TABLE
// =====================================

        await pool.request().query(`

IF NOT EXISTS (
    SELECT *
    FROM sysobjects
    WHERE name='Orders'
    AND xtype='U'
)

CREATE TABLE Orders(

    id INT IDENTITY(1,1) PRIMARY KEY,

    userId INT NOT NULL,

    total DECIMAL(10,2) NOT NULL,

    status NVARCHAR(30) DEFAULT 'Pending',

    createdAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY(userId)
    REFERENCES Users(id)

);

`);

        console.log("Orders table is ready.");


// =====================================
// ORDER ITEMS TABLE
// =====================================

        await pool.request().query(`

IF NOT EXISTS (
    SELECT *
    FROM sysobjects
    WHERE name='OrderItems'
    AND xtype='U'
)

CREATE TABLE OrderItems(

    id INT IDENTITY(1,1) PRIMARY KEY,

    orderId INT NOT NULL,

    productId INT NOT NULL,

    quantity INT NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY(orderId)
    REFERENCES Orders(id),

    FOREIGN KEY(productId)
    REFERENCES Products(id)

);

`);

        console.log("OrderItems table is ready.");
        // =====================================
// CATEGORIES TABLE
// =====================================

        await pool.request().query(`

IF NOT EXISTS (
    SELECT *
    FROM sysobjects
    WHERE name='Categories'
    AND xtype='U'
)

CREATE TABLE Categories(

    id INT IDENTITY(1,1) PRIMARY KEY,

    name NVARCHAR(100) NOT NULL UNIQUE,

    createdAt DATETIME DEFAULT GETDATE()

);

`);

        console.log("Categories table is ready.");


// =====================================
// ADD categoryId TO PRODUCTS
// =====================================

        await pool.request().query(`

IF COL_LENGTH('Products','categoryId') IS NULL

BEGIN

    ALTER TABLE Products

    ADD categoryId INT NULL;

END

`);


// =====================================
// FOREIGN KEY
// =====================================

        await pool.request().query(`

IF NOT EXISTS (

SELECT *

FROM sys.foreign_keys

WHERE name='FK_Product_Category'

)

BEGIN

ALTER TABLE Products

ADD CONSTRAINT FK_Product_Category

FOREIGN KEY(categoryId)

REFERENCES Categories(id);

END

`);

        console.log("Products linked to Categories.");

    }
    catch (error) {

        console.error("Error creating tables:", error);

    }

}

module.exports = initializeDatabase;