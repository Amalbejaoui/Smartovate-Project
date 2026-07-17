const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),

    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true
    },

    connectionTimeout: 60000,
    requestTimeout: 60000
};

const poolPromise = sql.connect(config)
    .then(pool => {
        console.log("Connected to Azure SQL Database");
        return pool;
    })
    .catch(err => {
        console.error("Database Connection Error:", err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise
};