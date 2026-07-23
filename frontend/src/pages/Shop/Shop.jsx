import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Shop.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Shop() {


    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {

        getProducts();

    }, []);




    const getProducts = async () => {

        try {

            const res = await api.get("/products");


            console.log("Products API:", res.data);



            setProducts(res.data.data || []);



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





    if (loading) {

        return (

            <div className="loading">

                Loading products... 🛍️

            </div>

        );

    }





    return (

        <div className="shop-page">


            <h1>
                Our Collection ✨
            </h1>



            {
                products.length === 0 ? (

                    <h3 className="empty">

                        No products available

                    </h3>


                ) : (


                    <div className="products-container">


                        {
                            products.map((product) => (


                                <div
                                    className="product-card"
                                    key={product.id}
                                >


                                    <img

                                        src={
                                            product.imageUrl ||
                                            "https://via.placeholder.com/300"
                                        }

                                        alt={product.name}

                                    />


                                    <h3>

                                        {product.name}

                                    </h3>


                                    <p>

                                        {product.description}

                                    </p>


                                    <div className="price">

                                        {product.price} DT

                                    </div>


                                    <button
                                        onClick={() => addToCart(product)}
                                    >
                                        Add To Cart 🛒
                                    </button>


                                </div>


                            ))

                        }


                    </div>


                )

            }



        </div>

    );

}



export default Shop;