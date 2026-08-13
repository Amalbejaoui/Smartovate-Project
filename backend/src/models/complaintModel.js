const { getPool } = require("../config/db");


// =====================================
// CREATE COMPLAINT - CLIENT
// =====================================

async function createComplaint(userId, subject, message) {

    const pool = await getPool;

    const result = await pool
        .request()
        .input("userId", userId)
        .input("subject", subject)
        .input("message", message)
        .query(`
            INSERT INTO Complaints
            (
                userId,
                subject,
                message,
                status
            )
            OUTPUT INSERTED.*
            VALUES
            (
                @userId,
                @subject,
                @message,
                'Pending'
            )
        `);

    return result.recordset[0];
}



// =====================================
// GET MY COMPLAINTS - CLIENT
// =====================================

async function getMyComplaints(userId) {

    const pool = await getPool;

    const result = await pool
        .request()
        .input("userId", userId)
        .query(`
            SELECT

                c.id,

                c.userId,

                c.subject,

                c.message,

                c.status,

                c.adminReply,

                c.createdAt,

                c.updatedAt

            FROM Complaints c

            WHERE c.userId = @userId

            ORDER BY c.createdAt DESC
        `);

    return result.recordset;
}



// =====================================
// GET ALL COMPLAINTS - ADMIN
// =====================================

async function getAllComplaints() {

    const pool = await getpool;

    const result = await pool
        .request()
        .query(`
            SELECT

                c.id,

                c.userId,

                c.subject,

                c.message,

                c.status,

                c.adminReply,

                c.createdAt,

                c.updatedAt,

                u.fullName AS customerName,

                u.email AS customerEmail

            FROM Complaints c

            INNER JOIN Users u
                ON c.userId = u.id

            ORDER BY c.createdAt DESC
        `);

    return result.recordset;
}



// =====================================
// UPDATE COMPLAINT - ADMIN
// =====================================

async function updateComplaint(id, status, adminReply) {

    const pool = await getPool;

    const result = await pool
        .request()
        .input("id", id)
        .input("status", status)
        .input("adminReply", adminReply || null)
        .query(`
            UPDATE Complaints

            SET
                status = @status,
                adminReply = @adminReply,
                updatedAt = GETDATE()

            WHERE id = @id
        `);

    return result.rowsAffected[0] > 0;
}



// =====================================
// DELETE COMPLAINT - ADMIN
// =====================================

async function deleteComplaint(id) {

    const pool = await getPool;

    const result = await pool
        .request()
        .input("id", id)
        .query(`
            DELETE FROM Complaints
            WHERE id = @id
        `);

    return result.rowsAffected[0] > 0;
}


module.exports = {

    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaint,
    deleteComplaint

};