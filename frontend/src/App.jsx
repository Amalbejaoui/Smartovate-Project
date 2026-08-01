import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

import Categories from "./pages/Categories/Categories";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminOrders from "./pages/AdminOrders/AdminOrders";

import ClientComplaints from "./pages/ClientComplaints/ClientComplaints";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import AdminReviews from "./pages/Admin Reviews/AdminReviews";
import AdminComplaints from "./pages/Admin Complaints/AdminComplaints";

import Wishlist from "./pages/Wishlist/Wishlist";


function App() {

    return (

        <WishlistProvider>

            <CartProvider>

                <BrowserRouter>

                    <Navbar />

                    <Routes>


                        {/* ================= HOME ================= */}

                        <Route
                            path="/"
                            element={<Home />}
                        />


                        {/* ================= SHOP ================= */}

                        <Route
                            path="/shop"
                            element={<Shop />}
                        />


                        {/* ================= CATEGORIES ================= */}

                        <Route
                            path="/categories"
                            element={<Categories />}
                        />


                        {/* ================= ABOUT ================= */}

                        <Route
                            path="/about"
                            element={<About />}
                        />


                        {/* ================= CONTACT ================= */}

                        <Route
                            path="/contact"
                            element={<Contact />}
                        />


                        {/* ================= CART ================= */}

                        <Route
                            path="/cart"
                            element={<Cart />}
                        />


                        {/* ================= CHECKOUT ================= */}

                        <Route
                            path="/checkout"
                            element={<Checkout />}
                        />


                        {/* ================= LOGIN ================= */}

                        <Route
                            path="/login"
                            element={<Login />}
                        />


                        {/* ================= REGISTER ================= */}

                        <Route
                            path="/register"
                            element={<Register />}
                        />


                        {/* ================= PRODUCT DETAILS ================= */}

                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />


                        {/* ================= COMPLAINTS ================= */}

                        <Route
                            path="/complaints"
                            element={<ClientComplaints />}
                        />


                        {/* ================= WISHLIST ================= */}

                        <Route
                            path="/wishlist"
                            element={<Wishlist />}
                        />


                        {/* ================= ADMIN DASHBOARD ================= */}

                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            }
                        />


                        {/* ================= ADMIN PRODUCTS ================= */}

                        <Route
                            path="/admin/products"
                            element={
                                <AdminRoute>
                                    <AdminProducts />
                                </AdminRoute>
                            }
                        />


                        {/* ================= ADMIN ORDERS ================= */}

                        <Route
                            path="/admin/orders"
                            element={
                                <AdminRoute>
                                    <AdminOrders />
                                </AdminRoute>
                            }
                        />


                        {/* ================= ADMIN REVIEWS ================= */}

                        <Route
                            path="/admin/reviews"
                            element={
                                <AdminRoute>
                                    <AdminReviews />
                                </AdminRoute>
                            }
                        />


                        {/* ================= ADMIN COMPLAINTS ================= */}

                        <Route
                            path="/admin/complaints"
                            element={
                                <AdminRoute>
                                    <AdminComplaints />
                                </AdminRoute>
                            }
                        />


                    </Routes>

                </BrowserRouter>

            </CartProvider>

        </WishlistProvider>

    );

}


export default App;