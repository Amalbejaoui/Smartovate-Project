const Cart = require("../models/cartModel");


// ==========================
// ADD TO CART
// ==========================
async function addToCart(req, res) {

    try {

        const userId = req.user.id;

        const {
            productId,
            quantity
        } = req.body;

        if (!productId) {

            return res.status(400).json({
                success: false,
                message: "Product is required."
            });

        }

        await Cart.addToCart(
            userId,
            productId,
            quantity || 1
        );

        res.status(201).json({
            success: true,
            message: "Product added to cart."
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error adding product."
        });

    }

}



// ==========================
// GET CART
// ==========================
async function getCart(req, res) {

    try {

        const userId = req.user.id;

        const cart =
            await Cart.getCart(userId);

        res.status(200).json({

            success: true,

            data: cart

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error loading cart."

        });

    }

}



// ==========================
// REMOVE ITEM
// ==========================
async function removeFromCart(req, res) {

    try {

        await Cart.removeFromCart(req.params.id);

        res.status(200).json({

            success: true,

            message: "Item removed."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Delete failed."

        });

    }

}


module.exports = {

    addToCart,
    getCart,
    removeFromCart

};