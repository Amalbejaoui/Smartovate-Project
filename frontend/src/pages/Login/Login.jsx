import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

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

            const res = await api.post("/users/login", form);

            localStorage.setItem("token", res.data.token);

            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Login Successful ❤️");

            navigate("/");

        }

        catch (err) {

            alert(err.response?.data?.message || "Login Failed");

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
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button>

                    Login

                </button>

                <span>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </span>

            </form>

        </div>

    );

}

export default Login;