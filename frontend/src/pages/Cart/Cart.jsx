import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";

function Cart() {

    const {

        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity

    } = useContext(CartContext);


    const total = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );

    console.log(cart);
    return (

        <div className="cart-page">

            <h1 className="cart-title">

                My Cart 🛒

            </h1>


            {

                cart.length === 0 ?

                    (

                        <h2 className="empty-cart">

                            Your cart is empty ❤️

                        </h2>

                    )

                    :

                    (

                        <>

                            <div className="cart-container">

                                {

                                    cart.map(product => (

                                        <div
                                            className="cart-card"
                                            key={product.id}
                                        >

                                            <div className="no-image">

                                                🛍️

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

                                                    -

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



                                            <h4>

                                                {

                                                    product.price *

                                                    product.quantity

                                                } DT

                                            </h4>



                                            <button

                                                className="remove-btn"

                                                onClick={() =>
                                                    removeFromCart(product.id)
                                                }

                                            >

                                                Remove

                                            </button>

                                        </div>

                                    ))

                                }

                            </div>



                            <div className="cart-total">

                                <h2>

                                    Total :

                                    {total} DT

                                </h2>



                                <button className="checkout-btn">

                                    Checkout

                                </button>

                            </div>

                        </>

                    )

            }

        </div>

    );

}

export default Cart;