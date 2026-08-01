const { poolPromise } = require("./db");

async function initializeDatabase() {

    try {

        const pool = await poolPromise;

        // =====================================
        // PRODUCTS TABLE
        // =====================================

        await pool.request().query(`
            IF NOT EXISTS (
                SELECT *
                FROM sysobjects
                WHERE name='Products'
                AND xtype='U'
            )
            BEGIN
                CREATE TABLE Products (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    name NVARCHAR(100) NOT NULL,
                    description NVARCHAR(500),
                    price DECIMAL(10,2) NOT NULL,
                    stock INT NOT NULL,
                    imageUrl NVARCHAR(MAX),
                    createdAt DATETIME DEFAULT GETDATE()
                );
            END
        `);

        console.log("Products table is ready.");


        // =====================================
        // FIX IMAGE URL SIZE
        // =====================================

        await pool.request().query(`
            IF EXISTS (
                SELECT *
                FROM sys.columns
                WHERE object_id = OBJECT_ID('Products')
                AND name = 'imageUrl'
            )
            BEGIN
                ALTER TABLE Products
                ALTER COLUMN imageUrl NVARCHAR(MAX);
            END
        `);

        console.log("Products imageUrl column is ready.");


        // =====================================
        // ADD isActive TO PRODUCTS
        // =====================================

        await pool.request().query(`
            IF COL_LENGTH('Products', 'isActive') IS NULL
            BEGIN
                ALTER TABLE Products
                ADD isActive BIT NOT NULL
                CONSTRAINT DF_Products_isActive DEFAULT 1;
            END
        `);

        console.log("Products isActive column is ready.");


        // =====================================
        // USERS TABLE
        // =====================================

        await pool.request().query(`
            IF NOT EXISTS (
                SELECT *
                FROM sysobjects
                WHERE name='Users'
                AND xtype='U'
            )
            BEGIN
                CREATE TABLE Users (

                    id INT IDENTITY(1,1) PRIMARY KEY,

                    fullName NVARCHAR(100) NOT NULL,

                    email NVARCHAR(100) NOT NULL UNIQUE,

                    password NVARCHAR(255) NOT NULL,

                    role NVARCHAR(20) NOT NULL DEFAULT 'client',

                    createdAt DATETIME DEFAULT GETDATE()

                );
            END
        `);

        console.log("Users table is ready.");


        // =====================================
        // CART ITEMS TABLE
        // =====================================

        await pool.request().query(`
            IF NOT EXISTS (
                SELECT *
                FROM sysobjects
                WHERE name='CartItems'
                AND xtype='U'
            )
            BEGIN
                CREATE TABLE CartItems (

                    id INT IDENTITY(1,1) PRIMARY KEY,

                    userId INT NOT NULL,

                    productId INT NOT NULL,

                    quantity INT NOT NULL DEFAULT 1,

                    createdAt DATETIME DEFAULT GETDATE(),

                    FOREIGN KEY(userId)
                        REFERENCES Users(id),

                    FOREIGN KEY(productId)
                        REFERENCES Products(id)

                );
            END
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
            BEGIN
                CREATE TABLE Orders (

                    id INT IDENTITY(1,1) PRIMARY KEY,

                    userId INT NOT NULL,

                    total DECIMAL(10,2) NOT NULL,

                    status NVARCHAR(30) DEFAULT 'Pending',

                    paymentMethod NVARCHAR(30)
                        DEFAULT 'Cash on Delivery',

                    paymentStatus NVARCHAR(30)
                        DEFAULT 'Pending',

                    paidAt DATETIME NULL,

                    createdAt DATETIME DEFAULT GETDATE(),

                    FOREIGN KEY(userId)
                        REFERENCES Users(id)

                );
            END
        `);

        console.log("Orders table is ready.");


        // =====================================
        // ADD PAYMENT COLUMNS TO OLD ORDERS
        // =====================================

        await pool.request().query(`

            IF COL_LENGTH('Orders', 'paymentMethod') IS NULL
            BEGIN
                ALTER TABLE Orders
                ADD paymentMethod NVARCHAR(30)
                DEFAULT 'Cash on Delivery';
            END

            IF COL_LENGTH('Orders', 'paymentStatus') IS NULL
            BEGIN
                ALTER TABLE Orders
                ADD paymentStatus NVARCHAR(30)
                DEFAULT 'Pending';
            END

            IF COL_LENGTH('Orders', 'paidAt') IS NULL
            BEGIN
                ALTER TABLE Orders
                ADD paidAt DATETIME NULL;
            END

        `);

        console.log("Orders payment fields are ready.");


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
            BEGIN
                CREATE TABLE OrderItems (

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
            END
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
            BEGIN
                CREATE TABLE Categories (

                    id INT IDENTITY(1,1) PRIMARY KEY,

                    name NVARCHAR(100) NOT NULL UNIQUE,

                    createdAt DATETIME DEFAULT GETDATE()

                );
            END
        `);

        console.log("Categories table is ready.");


        // =====================================
        // DEFAULT CATEGORIES
        // =====================================

        const categoriesResult = await pool.request().query(`
            SELECT COUNT(*) AS count
            FROM Categories
        `);

        if (categoriesResult.recordset[0].count === 0) {

            await pool.request().query(`
                INSERT INTO Categories (name)
                VALUES
                    ('Dresses'),
                    ('Bags'),
                    ('Shoes'),
                    ('Accessories'),
                    ('Frip de Luxe');
            `);

            console.log("Default categories inserted.");

        } else {

            console.log("Categories already exist.");

        }


        // =====================================
        // ADD categoryId TO PRODUCTS
        // =====================================

        await pool.request().query(`

            IF COL_LENGTH('Products', 'categoryId') IS NULL
            BEGIN

                ALTER TABLE Products
                ADD categoryId INT NULL;

            END

        `);


        // =====================================
        // PRODUCTS → CATEGORIES FOREIGN KEY
        // =====================================

        await pool.request().query(`

            IF NOT EXISTS (
                SELECT *
                FROM sys.foreign_keys
                WHERE name = 'FK_Product_Category'
            )
            BEGIN

                ALTER TABLE Products

                ADD CONSTRAINT FK_Product_Category

                FOREIGN KEY(categoryId)

                REFERENCES Categories(id);

            END

        `);

        console.log("Products linked to Categories.");


        // =====================================
// REVIEWS TABLE
// =====================================

        await pool.request().query(`

IF NOT EXISTS (
    SELECT *
    FROM sysobjects
    WHERE name = 'Reviews'
    AND xtype = 'U'
)

BEGIN

    CREATE TABLE Reviews (

        id INT IDENTITY(1,1) PRIMARY KEY,

        userId INT NOT NULL,

        productId INT NOT NULL,

        rating INT NOT NULL,

        comment NVARCHAR(1000),

        createdAt DATETIME DEFAULT GETDATE(),

        FOREIGN KEY (userId)
            REFERENCES Users(id),

        FOREIGN KEY (productId)
            REFERENCES Products(id),

        CONSTRAINT CK_Reviews_Rating
            CHECK (rating >= 1 AND rating <= 5)

    );

END

`);

        console.log("Reviews table is ready.");

        // =====================================
// COMPLAINTS TABLE
// =====================================

        await pool.request().query(`

IF NOT EXISTS (
    SELECT *
    FROM sysobjects
    WHERE name='Complaints'
    AND xtype='U'
)

CREATE TABLE Complaints(

    id INT IDENTITY(1,1) PRIMARY KEY,

    userId INT NOT NULL,

    subject NVARCHAR(200) NOT NULL,

    message NVARCHAR(MAX) NOT NULL,

    status NVARCHAR(30) NOT NULL
        DEFAULT 'Pending',

    adminReply NVARCHAR(MAX) NULL,

    createdAt DATETIME DEFAULT GETDATE(),

    updatedAt DATETIME NULL,

    FOREIGN KEY(userId)
        REFERENCES Users(id)

);

`);

        console.log("Complaints table is ready.");


    } catch (error) {

        console.error(
            "Error creating tables:",
            error
        );

    }

}

module.exports = initializeDatabase;