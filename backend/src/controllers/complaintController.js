const Complaint = require("../models/complaintModel");


// =====================================
// CREATE COMPLAINT - CLIENT
// =====================================

async function createComplaint(req, res) {

    try {

        const userId = req.user.id;

        const {
            subject,
            message
        } = req.body;


        if (!subject || !message) {

            return res.status(400).json({

                success: false,

                message: "Subject and message are required."

            });

        }


        const complaint =
            await Complaint.createComplaint(
                userId,
                subject,
                message
            );


        res.status(201).json({

            success: true,

            message: "Complaint submitted successfully.",

            data: complaint

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error submitting complaint."

        });

    }

}



// =====================================
// GET MY COMPLAINTS - CLIENT
// =====================================

async function getMyComplaints(req, res) {

    try {

        const userId = req.user.id;

        const complaints =
            await Complaint.getMyComplaints(userId);


        res.status(200).json({

            success: true,

            data: complaints

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error loading complaints."

        });

    }

}



// =====================================
// GET ALL COMPLAINTS - ADMIN
// =====================================

async function getAllComplaints(req, res) {

    try {

        const complaints =
            await Complaint.getAllComplaints();


        res.status(200).json({

            success: true,

            data: complaints

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error loading complaints."

        });

    }

}



// =====================================
// UPDATE COMPLAINT - ADMIN
// =====================================

async function updateComplaint(req, res) {

    try {

        const id = req.params.id;

        const {
            status,
            adminReply
        } = req.body;


        if (!status) {

            return res.status(400).json({

                success: false,

                message: "Status is required."

            });

        }


        const updated =
            await Complaint.updateComplaint(
                id,
                status,
                adminReply
            );


        if (!updated) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found."

            });

        }


        res.status(200).json({

            success: true,

            message: "Complaint updated successfully."

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error updating complaint."

        });

    }

}



// =====================================
// DELETE COMPLAINT - ADMIN
// =====================================

async function deleteComplaint(req, res) {

    try {

        const id = req.params.id;

        const deleted =
            await Complaint.deleteComplaint(id);


        if (!deleted) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found."

            });

        }


        res.status(200).json({

            success: true,

            message: "Complaint deleted successfully."

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error deleting complaint."

        });

    }

}


module.exports = {

    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaint,
    deleteComplaint

};