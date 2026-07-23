const Order = require("../models/orderModel");


// ===================================
// CREATE ORDER (CHECKOUT)
// ===================================
async function createOrder(req, res) {

    try {

        const userId = req.user.id;

        const order = await Order.createOrder(userId);

        res.status(201).json({

            success: true,

            message: "Order created successfully.",

            data: order

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}



// ===================================
// GET MY ORDERS
// ===================================
async function getMyOrders(req, res) {

    try {

        const userId = req.user.id;

        const orders = await Order.getMyOrders(userId);

        res.status(200).json({

            success: true,

            count: orders.length,

            data: orders

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Error loading orders."

        });

    }

}



// ===================================
// GET ALL ORDERS (ADMIN)
// ===================================
async function getAllOrders(req, res) {

    try {

        const orders = await Order.getAllOrders();

        res.status(200).json({

            success: true,

            count: orders.length,

            data: orders

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Error loading orders."

        });

    }

}



// ===================================
// UPDATE ORDER STATUS
// ===================================
async function updateStatus(req, res) {

    try {

        const { status } = req.body;

        const allowedStatus = [

            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled"

        ];

        if (!allowedStatus.includes(status)) {

            return res.status(400).json({

                success: false,

                message: "Invalid status."

            });

        }

        await Order.updateStatus(

            req.params.id,
            status

        );

        res.status(200).json({

            success: true,

            message: "Order status updated successfully."

        });

    }

    catch (error) {

        console.error(error);

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