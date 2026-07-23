import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import Products from "./Products/Products";
function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Categories />
            <Products />
        </>
    );
}

export default Home;