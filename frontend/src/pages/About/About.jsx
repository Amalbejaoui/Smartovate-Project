import "./About.css";

function About() {

    return (

        <div className="about-page">

            {/* HERO */}

            <section className="about-hero">

                <div className="about-hero-content">

                    <span className="about-small-title">
                        ✨ Welcome to Shopping By Amal
                    </span>

                    <h1>
                        Style That
                        <span> Feels Like You</span>
                    </h1>

                    <p>
                        Discover a carefully selected collection of
                        feminine, elegant and trendy pieces made to
                        make every look special.
                    </p>

                    <button
                        onClick={() =>
                            window.location.href = "/shop"
                        }
                    >
                        Discover Our Collection ✨
                    </button>

                </div>

                <div className="about-hero-decoration">
                    🛍️
                </div>

            </section>


            {/* OUR STORY */}

            <section className="about-story">

                <div className="story-image">

                    <div className="story-image-box">

                        <span>Shopping</span>

                        <strong>By Amal</strong>

                        <small>
                            Fashion • Elegance • You
                        </small>

                    </div>

                </div>


                <div className="story-content">

                    <span className="section-label">
                        OUR STORY
                    </span>

                    <h2>
                        More Than Just
                        <span> Shopping</span>
                    </h2>

                    <p>
                        Shopping By Amal is a feminine online boutique
                        created with one simple idea: making beautiful
                        fashion accessible, enjoyable and personal.
                    </p>

                    <p>
                        From elegant pieces and accessories to carefully
                        selected items, we choose products that can easily
                        become part of your own style.
                    </p>

                    <p>
                        Whether you are looking for something chic for
                        yourself or a special piece to complete your look,
                        we are here to help you find it.
                    </p>

                </div>

            </section>


            {/* VALUES */}

            <section className="about-values">

                <div className="values-header">

                    <span className="section-label">
                        WHY SHOPPING BY AMAL
                    </span>

                    <h2>
                        Designed With
                        <span> You</span> In Mind
                    </h2>

                    <p>
                        Every detail matters when it comes to your
                        shopping experience.
                    </p>

                </div>


                <div className="values-container">

                    <div className="value-card">

                        <div className="value-icon">
                            ✨
                        </div>

                        <h3>
                            Carefully Selected
                        </h3>

                        <p>
                            We select our products with attention to
                            style, quality and elegance.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-icon">
                            💕
                        </div>

                        <h3>
                            Feminine & Elegant
                        </h3>

                        <p>
                            Pieces chosen to help you express your
                            personality and your own style.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-icon">
                            🛍️
                        </div>

                        <h3>
                            Easy Shopping
                        </h3>

                        <p>
                            Browse our collection, add your favorites
                            to your cart and order easily.
                        </p>

                    </div>


                    <div className="value-card">

                        <div className="value-icon">
                            💌
                        </div>

                        <h3>
                            We're Here For You
                        </h3>

                        <p>
                            Need help choosing something? Contact us
                            and we will be happy to assist you.
                        </p>

                    </div>

                </div>

            </section>


            {/* CATEGORIES */}

            <section className="about-categories">

                <span className="section-label">
                    EXPLORE
                </span>

                <h2>
                    Find Your
                    <span> Perfect Style</span>
                </h2>

                <div className="about-category-list">

                    <div>
                        <span>👗</span>
                        <p>Dresses</p>
                    </div>

                    <div>
                        <span>👜</span>
                        <p>Bags</p>
                    </div>

                    <div>
                        <span>👠</span>
                        <p>Shoes</p>
                    </div>

                    <div>
                        <span>💎</span>
                        <p>Accessories</p>
                    </div>

                    <div>
                        <span>✨</span>
                        <p>Frip de Luxe</p>
                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="about-cta">

                <div>

                    <span>
                        YOUR STYLE. YOUR STORY. YOUR WAY. ✨
                    </span>

                    <h2>
                        Ready to find
                        <br />
                        something you love?
                    </h2>

                    <button
                        onClick={() =>
                            window.location.href = "/shop"
                        }
                    >
                        Shop Now 🛍️
                    </button>

                </div>

            </section>

        </div>

    );

}

export default About;