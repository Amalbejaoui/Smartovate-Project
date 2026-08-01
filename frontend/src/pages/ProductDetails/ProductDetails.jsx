import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { CartContext } from "../../context/CartContext";
import ProductReviews from "../../components/ProductReviews/ProductReviews";

import "./ProductDetails.css";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useContext(CartContext);


    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);


    // =====================================
    // LOAD PRODUCT
    // =====================================

    useEffect(() => {

        axios
            .get(`http://localhost:5000/products/${id}`)

            .then((res) => {

                console.log(
                    "Product details:",
                    res.data
                );

                setProduct(
                    res.data.data
                );

            })

            .catch((error) => {

                console.log(
                    "Error loading product:",
                    error
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }, [id]);


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="product-details-loading">

                Loading product... ✨

            </div>

        );

    }


    // =====================================
    // PRODUCT NOT FOUND
    // =====================================

    if (!product) {

        return (

            <div className="product-not-found">

                <h2>
                    Product not found
                </h2>

                <button
                    onClick={() => navigate("/products")}
                >
                    Back to Products
                </button>

            </div>

        );

    }


    // =====================================
    // PAGE
    // =====================================

    return (

        <div className="product-details-page">


            {/* =========================
                BACK
            ========================= */}

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>


            {/* =========================
                PRODUCT
            ========================= */}

            <div className="product-details-card">


                {/* IMAGE */}

                <div className="product-details-image">

                    <img
                        src={
                            product.imageUrl
                                ? product.imageUrl
                                : "https://via.placeholder.com/500"
                        }
                        alt={product.name}
                    />

                </div>


                {/* INFO */}

                <div className="product-details-info">


                    <span className="product-category">
                        Shopping by Amal ✨
                    </span>


                    <h1>
                        {product.name}
                    </h1>


                    <p className="product-description">
                        {product.description}
                    </p>


                    <div className="product-details-price">

                        {Number(product.price).toFixed(2)} DT

                    </div>


                    <div className="product-stock">

                        {product.stock > 0

                            ? `In stock: ${product.stock}`

                            : "Out of stock"

                        }

                    </div>


                    <button

                        className="add-details-cart"

                        disabled={product.stock <= 0}

                        onClick={() =>
                            addToCart(product)
                        }

                    >

                        {product.stock > 0
                            ? "Add To Cart 🛒"
                            : "Out of Stock"
                        }

                    </button>


                </div>


            </div>


            {/* =========================
                REVIEWS
            ========================= */}

            <ProductReviews
                productId={product.id}
            />


        </div>

    );

}


export default ProductDetails;