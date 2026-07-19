const { poolPromise } = require("../config/db");


// ==========================
// FIND USER BY EMAIL
// ==========================
async function findUserByEmail(email) {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("email", email)
        .query(`
            SELECT *
            FROM Users
            WHERE email=@email
        `);

    return result.recordset[0];
}



// ==========================
// CREATE USER
// ==========================
async function createUser(user) {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("fullName", user.fullName)
        .input("email", user.email)
        .input("password", user.password)
        .input("role", user.role || "client")
        .query(`

            INSERT INTO Users
            (
                fullName,
                email,
                password,
                role
            )

            OUTPUT INSERTED.id,
                   INSERTED.fullName,
                   INSERTED.email,
                   INSERTED.role

            VALUES
            (
                @fullName,
                @email,
                @password,
                @role
            )

        `);

    return result.recordset[0];
}

module.exports = {

    findUserByEmail,
    createUser

};