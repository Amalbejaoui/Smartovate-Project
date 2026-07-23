import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const addToCart = (product) => {

        const existingProduct = cart.find(
            item => item.id === product.id
        );

        if (existingProduct) {

            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            saveCart(updatedCart);

        } else {

            saveCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);

        }

    };

    const increaseQuantity = (id) => {

        const updatedCart = cart.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        saveCart(updatedCart);

    };

    const decreaseQuantity = (id) => {

        const updatedCart = cart
            .map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0);

        saveCart(updatedCart);

    };

    const removeFromCart = (id) => {

        saveCart(
            cart.filter(item => item.id !== id)
        );

    };

    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}