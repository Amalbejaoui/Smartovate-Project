import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";


function Products() {


    const [products, setProducts] = useState([]);



    useEffect(() => {


        axios
            .get("http://localhost:5000/products")

            .then((res) => {


                console.log("Products:", res.data);


                setProducts(
                    res.data.data || []
                );


            })

            .catch((err) => {


                console.log(
                    "Error loading products:",
                    err
                );


            });


    }, []);





    return (


        <section className="latest-products">



            <h2>

                Latest Collection ✨

            </h2>




            <p className="section-subtitle">

                Discover our newest fashion pieces

            </p>





            <div className="products-grid">


                {

                    products.map((product)=>(


                        <ProductCard

                            key={product.id}

                            product={product}

                        />


                    ))

                }


            </div>




        </section>


    );

}



export default Products;