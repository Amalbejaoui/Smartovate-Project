const Order = require("../models/orderModel");


// ===================================
// CREATE ORDER
// ===================================
async function createOrder(req, res) {

    try {

        const userId = req.user.id;

        const orderId =
            await Order.createOrder(userId);

        res.status(201).json({

            success: true,

            message: "Order created successfully.",

            orderId

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}



// ===================================
// MY ORDERS
// ===================================
async function getMyOrders(req, res) {

    try {

        const userId = req.user.id;

        const orders =
            await Order.getMyOrders(userId);

        res.status(200).json({

            success: true,

            data: orders

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error loading orders."

        });

    }

}



// ===================================
// ADMIN GET ALL ORDERS
// ===================================
async function getAllOrders(req, res) {

    try {

        const orders =
            await Order.getAllOrders();

        res.status(200).json({

            success: true,

            data: orders

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error."

        });

    }

}



// ===================================
// UPDATE STATUS
// ===================================
async function updateStatus(req, res) {

    try {

        const { status } = req.body;

        await Order.updateStatus(

            req.params.id,

            status

        );

        res.status(200).json({

            success: true,

            message: "Status updated."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Update failed."

        });

    }

}


module.exports = {

    createOrder,
    getMyOrders,
    getAllOrders,
    updateStatus

};