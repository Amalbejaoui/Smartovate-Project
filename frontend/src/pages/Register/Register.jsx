import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""

    });


    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (form.password !== form.confirmPassword) {

            alert("Passwords do not match ❌");
            return;

        }


        try {

            const res = await api.post("/users/register", {

                fullName: form.name,
                email: form.email,
                password: form.password

            });


            if (res.data.token) {

                localStorage.setItem(
                    "token",
                    res.data.token
                );

            }


            if (res.data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );

            }


            alert("Account created successfully ❤️");


            navigate("/");


        } catch (err) {


            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );


        }

    };


    return (

        <div className="register-page">


            <form
                className="register-box"
                onSubmit={handleSubmit}
            >


                <h2>
                    Shopping By Amal ✨
                </h2>


                <p>
                    Create your account
                </p>



                <input

                    type="text"

                    name="name"

                    placeholder="Full Name"

                    onChange={handleChange}

                    required

                />



                <input

                    type="email"

                    name="email"

                    placeholder="Email Address"

                    onChange={handleChange}

                    required

                />




                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                    required

                />



                <input

                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    onChange={handleChange}

                    required

                />



                <button type="submit">

                    Create Account

                </button>



                <span>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </span>



            </form>


        </div>

    );

}


export default Register;