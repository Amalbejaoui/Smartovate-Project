import { useNavigate } from "react-router-dom";
import "./Categories.css";

function Categories() {

    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            name: "Dresses",
            image: "/dress.jpg"
        },
        {
            id: 2,
            name: "Bags",
            image: "/bag.jpg"
        },
        {
            id: 3,
            name: "Shoes",
            image: "/shoes.jpg"
        },
        {
            id: 4,
            name: "Accessories",
            image: "/accessories.jpg"
        },
        {
            id: 5,
            name: "Frip de Luxe",
            image: "/frip.jpg"
        }
    ];

    const handleCategoryClick = (id) => {
        navigate(`/shop?category=${id}`);
    };

    return (

        <div className="categories-page">

            {/* HERO */}

            <section className="categories-hero">

                <span>
                    SHOPPING BY AMAL ✨
                </span>

                <h1>
                    Explore Our Categories
                </h1>

                <p>
                    Discover our carefully selected collection
                    made just for you.
                </p>

            </section>


            {/* CATEGORIES */}

            <section className="categories-section">

                <div className="categories-grid">

                    {categories.map((category) => (

                        <div
                            className="category-card"
                            key={category.id}
                            onClick={() =>
                                handleCategoryClick(category.id)
                            }
                        >

                            <img
                                src={category.image}
                                alt={category.name}
                            />

                            <div className="category-overlay">

                                <div>

                                    <span>
                                        COLLECTION
                                    </span>

                                    <h2>
                                        {category.name}
                                    </h2>

                                    <button>
                                        Explore Collection →
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </div>

    );
}

export default Categories;