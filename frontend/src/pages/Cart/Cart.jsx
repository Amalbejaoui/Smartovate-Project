import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";

function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext);

    const navigate = useNavigate();

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    return (

        <div className="cart-page">

            <h1 className="cart-title">
                My Cart 🛒
            </h1>

            {cart.length === 0 ? (

                <div className="empty-cart">

                    <h2>
                        Your cart is empty ❤️
                    </h2>

                    <button
                        className="continue-shopping"
                        onClick={() => navigate("/shop")}
                    >
                        Continue Shopping
                    </button>

                </div>

            ) : (

                <>

                    <div className="cart-container">

                        {cart.map(product => (

                            <div
                                className="cart-card"
                                key={product.id}
                            >

                                <div className="cart-image">

                                    <img
                                        src={
                                            product.imageUrl ||
                                            "https://via.placeholder.com/150"
                                        }
                                        alt={product.name}
                                    />

                                </div>


                                <div className="cart-info">

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p className="cart-description">
                                        {product.description}
                                    </p>

                                    <p className="cart-price">
                                        {product.price} DT
                                    </p>

                                </div>


                                <div className="quantity-box">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(product.id)
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {product.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(product.id)
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                <div className="product-total">

                                    {(
                                        Number(product.price) *
                                        product.quantity
                                    ).toFixed(2)} DT

                                </div>


                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeFromCart(product.id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>


                    <div className="cart-summary">

                        <div>

                            <span>
                                Number of items
                            </span>

                            <strong>
                                {cart.reduce(
                                    (sum, item) =>
                                        sum + item.quantity,
                                    0
                                )}
                            </strong>

                        </div>


                        <div className="total-row">

                            <span>
                                Total
                            </span>

                            <strong>
                                {total.toFixed(2)} DT
                            </strong>

                        </div>


                        <button
                            className="checkout-btn"
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed to Checkout 💳
                        </button>

                    </div>

                </>

            )}

        </div>

    );
}

export default Cart;