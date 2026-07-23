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

    } catch (error) {

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

        const cart = await Cart.getCart(userId);

        let grandTotal = 0;
        let totalQuantity = 0;

        cart.forEach(item => {

            grandTotal += Number(item.total);

            totalQuantity += item.quantity;

        });

        res.status(200).json({

            success: true,

            totalQuantity,

            grandTotal,

            items: cart

        });

    } catch (error) {

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

    } catch (error) {

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