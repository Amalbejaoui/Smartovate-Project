import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


function Navbar() {


    const navigate = useNavigate();


    const { cart } = useContext(CartContext);



    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const isAdmin = user?.role === "admin";



    const cartCount = cart.reduce(

        (total, item) =>
            total + (item.quantity || 1),

        0

    );




    const logout = () => {


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate("/login");


    };




    return (


        <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">


            <div className="container">



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
                        Shopping By Amal
                    </span>


                </Link>





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



                    <ul className="navbar-nav mx-auto">



                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >

                                Home

                            </Link>

                        </li>





                        {
                            !isAdmin && (

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/shop"
                                    >
                                        Shop
                                    </Link>

                                </li>

                            )
                        }





                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/categories"
                            >

                                Categories

                            </Link>

                        </li>





                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/about"
                            >

                                About

                            </Link>

                        </li>





                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/contact"
                            >

                                Contact

                            </Link>

                        </li>




                        {

                            isAdmin && (

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/admin"
                                    >

                                        Admin 👑

                                    </Link>


                                </li>

                            )

                        }




                    </ul>









                    <div className="icons">






                        <i className="fas fa-heart"></i>







                        <Link

                            to="/cart"

                            className="cart-icon"

                        >



                            <i className="fas fa-shopping-cart"></i>




                            {

                                cartCount > 0 && (

                                    <span className="cart-badge">

                                        {cartCount}

                                    </span>

                                )

                            }




                        </Link>









                        {


                            user ? (


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



                                )



                                :



                                (


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


                                )


                        }





                    </div>





                </div>





            </div>





        </nav>


    );


}


export default Navbar;