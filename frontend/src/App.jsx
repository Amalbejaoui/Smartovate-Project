import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shop from "./pages/Shop/Shop";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Cart from "./pages/Cart/Cart";
function App() {

    return (
        <CartProvider>

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />
                <Route

                    path="/admin"

                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }

                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/shop"
                    element={<Shop />}
                />
                <Route
                    path="/cart"
                    element={<Cart/>}
                />

            </Routes>

        </BrowserRouter>
        </CartProvider>
    );

}

export default App;