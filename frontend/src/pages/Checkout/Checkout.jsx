import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { CartContext } from "../../context/CartContext";
import "./Checkout.css";

function Checkout() {

    const navigate = useNavigate();

    const {
        cart,
        removeFromCart
    } = useContext(CartContext);

    const [paymentMethod, setPaymentMethod] =
        useState("Cash on Delivery");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    // ==========================
    // USER
    // ==========================

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token =
        localStorage.getItem("token");


    // ==========================
    // TOTAL
    // ==========================

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity),
        0
    );


    // ==========================
    // EMPTY CART
    // ==========================

    if (cart.length === 0) {

        return (

            <div className="checkout-page">

                <div className="empty-checkout">

                    <div className="empty-icon">
                        🛍️
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some beautiful items
                        before checkout.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/shop")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        );

    }


    // ==========================
    // PLACE ORDER
    // ==========================

    const handleCheckout = async (e) => {

        e.preventDefault();

        if (!token) {

            alert(
                "Please login before checkout."
            );

            navigate("/login");

            return;

        }


        try {

            setLoading(true);

            setMessage("");


            const response =
                await api.post(

                    "/orders",

                    {
                        paymentMethod
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );


            console.log(
                "ORDER RESPONSE:",
                response.data
            );


            // ==========================
            // REMOVE CART ITEMS
            // ==========================

            cart.forEach(item => {

                removeFromCart(item.id);

            });


            // ==========================
            // SUCCESS
            // ==========================

            alert(
                paymentMethod === "Card"
                    ? "Payment successful! ❤️"
                    : "Order placed successfully! ❤️"
            );


            navigate("/orders");


        }

        catch (error) {

            console.error(
                "Checkout error:",
                error
            );


            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="checkout-page">

            <div className="checkout-container">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="checkout-header">

                    <span className="checkout-small-title">
                        SHOPPING BY AMAL
                    </span>

                    <h1>
                        Checkout ✨
                    </h1>

                    <p>
                        Complete your order with love.
                    </p>

                </div>



                {/* =================================
                    USER INFORMATION
                ================================= */}

                <div className="checkout-card">

                    <div className="section-title">

                        <span className="section-icon">
                            👤
                        </span>

                        <div>

                            <h2>
                                Customer Information
                            </h2>

                            <p>
                                Your account details
                            </p>

                        </div>

                    </div>


                    <div className="customer-info">

                        <div className="info-box">

                            <span>
                                Name
                            </span>

                            <strong>
                                {user?.fullName ||
                                    "Customer"}
                            </strong>

                        </div>


                        <div className="info-box">

                            <span>
                                Email
                            </span>

                            <strong>
                                {user?.email ||
                                    "No email"}
                            </strong>

                        </div>

                    </div>

                </div>



                {/* =================================
                    ORDER SUMMARY
                ================================= */}

                <div className="checkout-card">

                    <div className="section-title">

                        <span className="section-icon">
                            🛍️
                        </span>

                        <div>

                            <h2>
                                Your Order
                            </h2>

                            <p>
                                Review your selected items
                            </p>

                        </div>

                    </div>


                    <div className="order-items">

                        {cart.map(item => (

                            <div
                                className="checkout-item"
                                key={item.id}
                            >

                                <img
                                    src={
                                        item.imageUrl ||
                                        "https://via.placeholder.com/100"
                                    }
                                    alt={item.name}
                                />


                                <div className="item-info">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        Quantity:
                                        {" "}
                                        {item.quantity}
                                    </p>

                                </div>


                                <div className="item-price">

                                    {(
                                        Number(item.price) *
                                        Number(item.quantity)
                                    ).toFixed(2)}

                                    {" "}DT

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="total-section">

                        <span>
                            Total
                        </span>

                        <strong>
                            {total.toFixed(2)} DT
                        </strong>

                    </div>

                </div>



                {/* =================================
                    PAYMENT
                ================================= */}

                <form
                    className="checkout-card payment-card"
                    onSubmit={handleCheckout}
                >

                    <div className="section-title">

                        <span className="section-icon">
                            💳
                        </span>

                        <div>

                            <h2>
                                Payment Method
                            </h2>

                            <p>
                                Choose how you want to pay
                            </p>

                        </div>

                    </div>


                    <div className="payment-options">


                        {/* CASH */}

                        <label
                            className={
                                paymentMethod ===
                                "Cash on Delivery"
                                    ? "payment-option selected"
                                    : "payment-option"
                            }
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="Cash on Delivery"
                                checked={
                                    paymentMethod ===
                                    "Cash on Delivery"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />


                            <div className="payment-icon">
                                💵
                            </div>


                            <div className="payment-content">

                                <strong>
                                    Cash on Delivery
                                </strong>

                                <span>
                                    Pay when your order arrives
                                </span>

                            </div>


                            <div className="radio-circle">
                                {paymentMethod ===
                                "Cash on Delivery"
                                    ? "✓"
                                    : ""}
                            </div>

                        </label>



                        {/* CARD */}

                        <label
                            className={
                                paymentMethod === "Card"
                                    ? "payment-option selected"
                                    : "payment-option"
                            }
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="Card"
                                checked={
                                    paymentMethod ===
                                    "Card"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />


                            <div className="payment-icon">
                                💳
                            </div>


                            <div className="payment-content">

                                <strong>
                                    Card
                                </strong>

                                <span>
                                    Secure online payment
                                </span>

                            </div>


                            <div className="radio-circle">
                                {paymentMethod === "Card"
                                    ? "✓"
                                    : ""}
                            </div>

                        </label>

                    </div>



                    {/* CARD SIMULATION */}

                    {paymentMethod === "Card" && (

                        <div className="card-notice">

                            <span>
                                🔒
                            </span>

                            <div>

                                <strong>
                                    Secure Payment
                                </strong>

                                <p>
                                    Card payment is currently
                                    simulated for this project.
                                </p>

                            </div>

                        </div>

                    )}



                    {/* ERROR */}

                    {message && (

                        <div className="checkout-error">

                            ⚠️ {message}

                        </div>

                    )}



                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="place-order-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Processing..."
                            : paymentMethod === "Card"
                                ? `Pay ${total.toFixed(2)} DT 💳`
                                : `Place Order ${total.toFixed(2)} DT 🛍️`
                        }

                    </button>


                    <p className="secure-text">

                        🔒 Your order information is secure

                    </p>

                </form>


            </div>

        </div>

    );

}

export default Checkout;