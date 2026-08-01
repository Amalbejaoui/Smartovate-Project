import { useState } from "react";
import "./Contact.css";

function Contact() {
    const whatsappNumber = "21695921917";

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        alert(
            "Thank you for contacting Shopping By Amal 💕 We will get back to you soon!"
        );

        setForm({
            name: "",
            email: "",
            subject: "",
            message: ""
        });

    };


    return (

        <div className="contact-page">


            {/* =====================================
                HERO
            ===================================== */}

            <section className="contact-hero">

                <div className="contact-hero-content">

                    <span>
                        ✨ GET IN TOUCH
                    </span>

                    <h1>
                        We'd Love To
                        <strong> Hear From You</strong>
                    </h1>

                    <p>
                        Have a question about an item, your order,
                        delivery or anything else?
                        Send us a message and we'll be happy to help.
                    </p>

                </div>

                <div className="contact-hero-icon">

                    💌

                </div>

            </section>



            {/* =====================================
                CONTACT CONTENT
            ===================================== */}

            <section className="contact-section">


                {/* LEFT SIDE */}

                <div className="contact-info">


                    <span className="contact-label">
                        CONTACT US
                    </span>


                    <h2>
                        Let's Talk
                        <span> ✨</span>
                    </h2>


                    <p className="contact-description">

                        Whether you need help choosing the perfect
                        piece or simply want to ask us something,
                        we're always happy to hear from you.

                    </p>



                    {/* EMAIL */}

                    <div className="contact-card">

                        <div className="contact-icon">
                            ✉️
                        </div>

                        <div>

                            <small>
                                EMAIL
                            </small>

                            <h3>
                                Bejaoui.amal@esprit.tn
                            </h3>

                        </div>

                    </div>



                    {/* PHONE */}

                    <div className="contact-card">

                        <div className="contact-icon">
                            📱
                        </div>

                        <div>

                            <small>
                                PHONE
                            </small>

                            <h3>
                                +216 95 921 917
                            </h3>

                        </div>

                    </div>



                    {/* LOCATION */}

                    <div className="contact-card">

                        <div className="contact-icon">
                            📍
                        </div>

                        <div>

                            <small>
                                LOCATION
                            </small>

                            <h3>
                                Bizerte, Tunisia
                            </h3>

                        </div>

                    </div>



                    {/* SOCIAL */}

                    <div className="contact-social">

                        <p>
                            Follow us
                        </p>

                        <div className="social-buttons">

                            <a href="#">
                                Instagram
                            </a>

                            <a href="https://www.facebook.com/shopp.ing.577149/">
                                Facebook
                            </a>

                            <a href="https://wa.me/${whatsappNumber}">
                                WhatsApp
                            </a>

                        </div>

                    </div>

                </div>



                {/* RIGHT SIDE - FORM */}

                <div className="contact-form-wrapper">

                    <div className="form-header">

                        <span>
                            SEND A MESSAGE
                        </span>

                        <h2>
                            How Can We
                            <strong> Help You?</strong>
                        </h2>

                    </div>


                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>

                        </div>



                        <div className="form-group">

                            <label>
                                Subject
                            </label>

                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="What can we help you with?"
                                required
                            />

                        </div>



                        <div className="form-group">

                            <label>
                                Message
                            </label>

                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                rows="6"
                                required
                            />

                        </div>



                        <button
                            type="submit"
                            className="send-btn"
                        >

                            Send Message

                            <span>
                                →
                            </span>

                        </button>


                    </form>

                </div>


            </section>



            {/* =====================================
                BOTTOM CTA
            ===================================== */}

            <section className="contact-cta">

                <div className="cta-decoration left">
                    ✨
                </div>

                <div>

                    <span>
                        SHOPPING BY AMAL
                    </span>

                    <h2>
                        Your Style,
                        <br />
                        Your Story 💕
                    </h2>

                    <p>
                        Discover something beautiful
                        made just for you.
                    </p>

                    <button
                        onClick={() =>
                            window.location.href = "/shop"
                        }
                    >
                        Explore Our Collection 🛍️
                    </button>

                </div>

                <div className="cta-decoration right">
                    ✨
                </div>

            </section>


        </div>

    );

}

export default Contact;