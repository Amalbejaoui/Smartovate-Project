import "./ProductCard.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


function ProductCard({ product }) {


    const { addToCart } = useContext(CartContext);



    return (


        <div className="product-card">


            <div className="image-box">


                <img

                    src={
                        product.imageUrl
                            ? `/${product.imageUrl}`
                            : "https://via.placeholder.com/300"
                    }

                    alt={product.name}

                />


            </div>





            <h3>

                {product.name}

            </h3>




            <p>

                {product.description}

            </p>





            <div className="price-row">



                <span className="price">

                    {product.price} DT

                </span>





                <button

                    onClick={() => addToCart(product)}

                >

                    Add To Cart 🛒


                </button>




            </div>




        </div>


    );

}


export default ProductCard;