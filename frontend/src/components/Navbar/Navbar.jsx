import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";


function Navbar() {


    const navigate = useNavigate();


    // ==============================
    // CART
    // ==============================

    const { cart } = useContext(CartContext);


    // ==============================
    // WISHLIST
    // ==============================

    const { wishlist } =
        useContext(WishlistContext);



    // ==============================
    // USER
    // ==============================

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const isAdmin =
        user?.role === "admin";



    // ==============================
    // CART COUNT
    // ==============================

    const cartCount = cart.reduce(

        (total, item) =>
            total + (item.quantity || 1),

        0

    );



    // ==============================
    // LOGOUT
    // ==============================

    const logout = () => {


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate("/login");

    };



    return (


        <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">


            <div className="container">


                {/* =========================
                    LOGO
                ========================= */}

                <Link
                    className="navbar-brand logo"
                    to="/"
                >


                    <img
                        src={logo}
                        alt="Shopping By Amal"
                        className="logo-img"
                    />


                    <span>
                        Shopp Ing By Amal
                    </span>


                </Link>



                {/* =========================
                    MOBILE MENU
                ========================= */}

                <button

                    className="navbar-toggler"

                    type="button"

                    data-bs-toggle="collapse"

                    data-bs-target="#navbarNav"

                >

                    <span className="navbar-toggler-icon"></span>

                </button>



                <div

                    className="collapse navbar-collapse"

                    id="navbarNav"

                >


                    {/* =========================
                        MENU
                    ========================= */}

                    <ul className="navbar-nav mx-auto">


                        {/* HOME */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >

                                Home

                            </Link>

                        </li>



                        {/* SHOP */}

                        {!isAdmin && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/shop"
                                >

                                    Shop

                                </Link>

                            </li>

                        )}



                        {/* CATEGORIES */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/categories"
                            >

                                Categories

                            </Link>

                        </li>



                        {/* COMPLAINTS */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/complaints"
                            >

                                Complaints

                            </Link>

                        </li>



                        {/* ABOUT */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/about"
                            >

                                About

                            </Link>

                        </li>



                        {/* CONTACT */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/contact"
                            >

                                Contact

                            </Link>

                        </li>



                        {/* ADMIN */}

                        {isAdmin && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/admin"
                                >

                                    Admin 👑

                                </Link>

                            </li>

                        )}


                    </ul>



                    {/* =========================
                        RIGHT ICONS
                    ========================= */}

                    <div className="icons">


                        {/* =========================
                            WISHLIST ❤️
                        ========================= */}

                        {!isAdmin && (

                            <Link
                                to="/wishlist"
                                className="wishlist-icon"
                            >

                                <i className="bi bi-heart-fill"></i>

                                {wishlist.length > 0 && (

                                    <span className="wishlist-badge">

                                        {wishlist.length}

                                    </span>

                                )}

                            </Link>

                        )}



                        {/* =========================
                            CART 🛒
                        ========================= */}

                        {!isAdmin && (

                            <Link

                                to="/cart"

                                className="cart-icon"

                            >


                                <i className="bi bi-bag-fill"></i>

                                {cartCount > 0 && (

                                    <span className="cart-badge">

                                        {cartCount}

                                    </span>

                                )}


                            </Link>

                        )}



                        {/* =========================
                            USER
                        ========================= */}

                        {user ? (

                            <>


                                <span className="user-name">

                                    Hi {user.fullName}

                                </span>



                                <button

                                    className="login-btn"

                                    onClick={logout}

                                >

                                    Logout

                                </button>


                            </>

                        ) : (

                            <>


                                <button

                                    className="login-btn"

                                    onClick={() =>
                                        navigate("/login")
                                    }

                                >

                                    Login

                                </button>



                                <button

                                    className="register-btn"

                                    onClick={() =>
                                        navigate("/register")
                                    }

                                >

                                    Register

                                </button>


                            </>

                        )}


                    </div>


                </div>


            </div>


        </nav>

    );

}


export default Navbar;