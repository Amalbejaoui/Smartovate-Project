import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

    const [wishlist, setWishlist] = useState(() => {

        const savedWishlist =
            localStorage.getItem("wishlist");

        return savedWishlist
            ? JSON.parse(savedWishlist)
            : [];

    });


    // ==============================
    // SAVE WISHLIST
    // ==============================

    useEffect(() => {

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    }, [wishlist]);


    // ==============================
    // ADD / REMOVE
    // ==============================

    const toggleWishlist = (product) => {

        setWishlist((currentWishlist) => {

            const exists = currentWishlist.some(
                item => item.id === product.id
            );


            if (exists) {

                return currentWishlist.filter(
                    item => item.id !== product.id
                );

            }


            return [
                ...currentWishlist,
                product
            ];

        });

    };


    // ==============================
    // CHECK
    // ==============================

    const isInWishlist = (productId) => {

        return wishlist.some(
            item => item.id === productId
        );

    };


    // ==============================
    // REMOVE
    // ==============================

    const removeFromWishlist = (productId) => {

        setWishlist((currentWishlist) =>
            currentWishlist.filter(
                item => item.id !== productId
            )
        );

    };


    // ==============================
    // CLEAR
    // ==============================

    const clearWishlist = () => {

        setWishlist([]);

    };


    return (

        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                isInWishlist,
                removeFromWishlist,
                clearWishlist
            }}
        >

            {children}

        </WishlistContext.Provider>

    );

}


export default WishlistProvider;