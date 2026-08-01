import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

const API_URL = "http://localhost:5000";

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);


    // =====================================
    // GET CURRENT USER
    // =====================================

    const getCurrentUser = () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            return user;

        } catch (error) {

            return null;

        }

    };


    // =====================================
    // GET TOKEN
    // =====================================

    const getToken = () => {

        return localStorage.getItem("token");

    };


    // =====================================
    // GET AUTH HEADERS
    // =====================================

    const getHeaders = () => {

        const token = getToken();

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

    };


    // =====================================
    // LOAD CART FROM DATABASE
    // =====================================

    const loadCart = async () => {

        const user = getCurrentUser();

        if (!user) {

            setCart([]);

            return;

        }

        try {

            setLoading(true);

            const response = await axios.get(
                `${API_URL}/cart`,
                getHeaders()
            );

            if (response.data.success) {

                setCart(response.data.items || []);

            } else {

                setCart([]);

            }

        } catch (error) {

            console.log(
                "Error loading cart:",
                error.response?.data || error.message
            );

            setCart([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // LOAD CART WHEN APP STARTS
    // =====================================

    useEffect(() => {

        loadCart();

    }, []);


    // =====================================
    // ADD TO CART
    // =====================================

    const addToCart = async (product) => {

        const user = getCurrentUser();

        if (!user) {

            alert(
                "Please login first to add products to your cart ❤️"
            );

            return;

        }

        try {

            await axios.post(

                `${API_URL}/cart`,

                {
                    productId: product.id,
                    quantity: 1
                },

                getHeaders()

            );

            // Reload cart from database

            await loadCart();

            alert("Product added to cart ❤️");

        } catch (error) {

            console.log(
                "Error adding product:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Error adding product."
            );

        }

    };


    // =====================================
    // INCREASE QUANTITY
    // =====================================

    const increaseQuantity = async (id) => {

        const item = cart.find(
            item =>
                item.id === id ||
                item.productId === id
        );

        if (!item) return;

        try {

            await axios.post(

                `${API_URL}/cart`,

                {
                    productId: item.productId,
                    quantity: 1
                },

                getHeaders()

            );

            await loadCart();

        } catch (error) {

            console.log(
                "Error increasing quantity:",
                error.response?.data || error.message
            );

        }

    };


    // =====================================
    // REMOVE FROM CART
    // =====================================

    const removeFromCart = async (id) => {

        try {

            await axios.delete(

                `${API_URL}/cart/${id}`,

                getHeaders()

            );

            await loadCart();

        } catch (error) {

            console.log(
                "Error removing item:",
                error.response?.data || error.message
            );

        }

    };


    // =====================================
    // DECREASE QUANTITY
    // =====================================

    const decreaseQuantity = async (id) => {

        const item = cart.find(
            item =>
                item.id === id ||
                item.productId === id
        );

        if (!item) return;


        // If quantity = 1, remove item

        if (item.quantity <= 1) {

            await removeFromCart(item.id);

            return;

        }


        // Backend doesn't have decrease endpoint yet.
        // We will add it later.

        console.log(
            "Decrease quantity requires backend update endpoint."
        );

    };


    // =====================================
    // CLEAR CART
    // =====================================

    const clearCart = async () => {

        setCart([]);

    };


    return (

        <CartContext.Provider
            value={{

                cart,

                loading,

                addToCart,

                increaseQuantity,

                decreaseQuantity,

                removeFromCart,

                clearCart,

                loadCart

            }}
        >

            {children}

        </CartContext.Provider>

    );

}