import "./Categories.css";


function Categories() {


    const categories = [

        {
            id:1,
            name:"Dresses",
            image:"/dress.jpg"
        },

        {
            id:2,
            name:"Bags",
            image:"/bag.jpg"
        },

        {
            id:3,
            name:"Shoes",
            image:"/shoes.jpg"
        },

        {
            id:4,
            name:"Accessories",
            image:"/accessories.jpg"
        },

        {
            id:5,
            name:"Frip de Luxe",
            image:"/frip.jpg"
        }

    ];



    return (

        <section className="categories">


            <h2>

                Shop By Category ✨

            </h2>



            <div className="category-container">


                {

                    categories.map((category)=>(


                        <div
                            className="category-card"
                            key={category.id}
                        >


                            <img

                                src={
                                    category.image
                                }

                                alt={category.name}

                            />


                            <div className="overlay">

                            <h3>

                                    {category.name}

                                </h3>

                            </div>


                        </div>


                    ))

                }


            </div>



        </section>

    );

}


export default Categories;