import "./Hero.css";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.jpg";


function Hero() {

    return (

        <section
            className="hero"
            style={{
                backgroundImage: `url(${heroImage})`
            }}
        >

            <div className="hero-content">

                <h1>
                    Elegant Fashion
                    <br />
                    For Every Woman ✨
                </h1>


                <p>
                    Discover luxury fashion,
                    exclusive pieces and
                    special orders from Shein.
                </p>


                <Link
                    to="/shop"
                    className="hero-btn"
                >
                    Shop Now 🛍️
                </Link>

            </div>

        </section>

    );
}


export default Hero;