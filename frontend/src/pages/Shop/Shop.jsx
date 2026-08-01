import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../../services/api";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Shop.css";


function Shop() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();


    // =====================================
    // CATEGORY FROM URL
    // =====================================

    const categoryId = searchParams.get("category");


    // =====================================
    // CATEGORY NAMES
    // =====================================

    const categories = {

        1: "Dresses",

        2: "Bags",

        3: "Shoes",

        4: "Accessories",

        5: "Frip de Luxe"

    };


    // =====================================
    // GET PRODUCTS
    // =====================================

    useEffect(() => {

        getProducts();

    }, [categoryId]);


    const getProducts = async () => {

        try {

            setLoading(true);


            const res = await api.get("/products");


            console.log("Products API:", res.data);


            const allProducts = res.data.data || [];


            // =================================
            // FILTER BY CATEGORY
            // =================================

            if (categoryId) {

                const filteredProducts = allProducts.filter(
                    (product) =>
                        Number(product.categoryId) ===
                        Number(categoryId)
                );


                setProducts(filteredProducts);

            } else {

                setProducts(allProducts);

            }


        } catch (error) {

            console.log(
                "Error fetching products:",
                error
            );

            setProducts([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="loading">

                Loading products... 🛍️

            </div>

        );

    }


    // =====================================
    // TITLE
    // =====================================

    const title = categoryId
        ? `${categories[categoryId] || "Category"} ✨`
        : "Our Collection ✨";


    // =====================================
    // PAGE
    // =====================================

    return (

        <div className="shop-page">


            {/* =========================
                TITLE
            ========================= */}

            <h1>
                {title}
            </h1>


            {/* =========================
                CATEGORY FILTER
            ========================= */}

            {categoryId && (

                <div className="category-filter">

                    <span>

                        Showing products from{" "}

                        <strong>
                            {categories[categoryId]}
                        </strong>

                    </span>


                    <button
                        onClick={() =>
                            window.location.href = "/shop"
                        }
                    >

                        View All Products

                    </button>

                </div>

            )}


            {/* =========================
                EMPTY
            ========================= */}

            {products.length === 0 ? (

                <h3 className="empty">

                    {categoryId

                        ? `No products available in ${
                            categories[categoryId] ||
                            "this category"
                        }`

                        : "No products available"

                    }

                </h3>

            ) : (


                /* =========================
                   PRODUCTS
                ========================= */

                <div className="products-container">

                    {products.map((product) => (

                        <ProductCard

                            key={product.id}

                            product={product}

                        />

                    ))}

                </div>

            )}

        </div>

    );

}


export default Shop;