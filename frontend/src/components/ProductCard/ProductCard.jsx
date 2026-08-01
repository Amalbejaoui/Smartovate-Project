import "./ProductCard.css";

import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

import { WishlistContext } from "../../context/WishlistContext";

import { useNavigate } from "react-router-dom";


function ProductCard({ product }) {


    const { addToCart } =
        useContext(CartContext);


    const {
        toggleWishlist,
        isInWishlist
    } = useContext(WishlistContext);


    const navigate = useNavigate();



    // =====================================
    // DETAILS
    // =====================================

    const handleDetails = () => {

        navigate(`/products/${product.id}`);

    };



    // =====================================
    // WISHLIST
    // =====================================

    const handleWishlist = () => {

        toggleWishlist(product);

    };



    return (

        <div className="product-card">


            {/* =========================
                IMAGE
            ========================= */}

            <div className="image-box">

                <img

                    src={
                        product.imageUrl ||
                        "https://via.placeholder.com/300"
                    }

                    alt={product.name}

                />


                {/* =========================
                    WISHLIST ❤️
                ========================= */}

                <button

                    type="button"

                    className={`wishlist-btn ${
                        isInWishlist(product.id)
                            ? "active"
                            : ""
                    }`}

                    onClick={handleWishlist}

                    title={
                        isInWishlist(product.id)
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"
                    }

                >

                    {isInWishlist(product.id)
                        ? "♥"
                        : "♡"}

                </button>


            </div>



            {/* =========================
                NAME
            ========================= */}

            <h3>
                {product.name}
            </h3>



            {/* =========================
                DESCRIPTION
            ========================= */}

            <p>
                {product.description}
            </p>



            {/* =========================
                PRICE
            ========================= */}

            <div className="product-price">

                {Number(product.price).toFixed(2)} DT

            </div>



            {/* =========================
                VIEW DETAILS
            ========================= */}

            <button

                type="button"

                className="details-btn"

                onClick={handleDetails}

            >

                View Details 👗

            </button>



            {/* =========================
                ADD TO CART
            ========================= */}

            {product.stock > 0 ? (

                <button

                    type="button"

                    className="cart-btn"

                    onClick={() =>
                        addToCart(product)
                    }

                >

                    Add To Cart 🛒

                </button>

            ) : (

                <button

                    type="button"

                    className="cart-btn out-of-stock"

                    disabled

                >

                    Out of Stock

                </button>

            )}


        </div>

    );

}


export default ProductCard;