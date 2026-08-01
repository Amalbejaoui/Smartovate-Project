import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import "./Wishlist.css";

function Wishlist() {

    const {
        wishlist,
        removeFromWishlist
    } = useContext(WishlistContext);

    const { addToCart } =
        useContext(CartContext);


    return (

        <div className="wishlist-page">

            <div className="wishlist-header">

                <h1>
                    My Wishlist ❤️
                </h1>

                <p>
                    Your favorite products
                </p>

            </div>


            {wishlist.length === 0 ? (

                <div className="empty-wishlist">

                    <div className="empty-heart">
                        ♡
                    </div>

                    <h2>
                        Your wishlist is empty
                    </h2>

                    <p>
                        Save your favorite products here.
                    </p>

                    <Link
                        to="/shop"
                        className="wishlist-shop-btn"
                    >
                        Discover Products ✨
                    </Link>

                </div>

            ) : (

                <div className="wishlist-grid">

                    {wishlist.map(product => (

                        <div
                            className="wishlist-card"
                            key={product.id}
                        >

                            <div className="wishlist-image">

                                <img
                                    src={
                                        product.imageUrl ||
                                        "https://via.placeholder.com/300"
                                    }
                                    alt={product.name}
                                />

                            </div>


                            <div className="wishlist-info">

                                <h3>
                                    {product.name}
                                </h3>

                                <p>
                                    {product.description}
                                </p>

                                <div className="wishlist-price">

                                    {Number(product.price).toFixed(2)} DT

                                </div>


                                <div className="wishlist-actions">

                                    <button
                                        className="wishlist-cart-btn"
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                    >
                                        Add To Cart 🛒
                                    </button>


                                    <Link
                                        to={`/products/${product.id}`}
                                        className="wishlist-details-btn"
                                    >
                                        Details
                                    </Link>


                                    <button
                                        className="wishlist-remove-btn"
                                        onClick={() =>
                                            removeFromWishlist(
                                                product.id
                                            )
                                        }
                                    >
                                        ❤️
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default Wishlist;