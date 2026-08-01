import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post(
                "/users/login",
                form
            );


            // =====================================
            // SAVE TOKEN
            // =====================================

            localStorage.setItem(
                "token",
                res.data.token
            );


            // =====================================
            // SAVE LOGGED USER
            // =====================================

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );


            alert("Login Successful ❤️");


            // =====================================
            // RELOAD APP
            // CartContext will load the
            // cart of the new user
            // =====================================

            window.location.href = "/";


        } catch (err) {

            console.log("Login error:", err);

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    };


    return (

        <div className="login-page">

            <form
                className="login-box"
                onSubmit={handleSubmit}
            >

                <h2>
                    Shopping By Amal
                </h2>


                <p>
                    Welcome Back ❤️
                </p>


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />


                <button type="submit">
                    Login
                </button>


                <span>

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Register
                    </Link>

                </span>

            </form>

        </div>

    );

}

export default Login;