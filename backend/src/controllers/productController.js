const Product = require("../models/productModel");

// GET /products
async function getProducts(req, res) {
    try {
        const products = await Product.getAllProducts();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des produits."
        });
    }
}

// POST /products
async function addProduct(req, res) {

    try {

        const newProduct = await Product.createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Produit ajouté avec succès.",
            data: newProduct
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de l'ajout du produit."
        });

    }

}
// PUT /products/:id
async function updateProduct(req, res) {

    try {

        const id = req.params.id;

        const updatedProduct = await Product.updateProduct(
            id,
            req.body
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success:false,
                message:"Produit introuvable"
            });
        }


        res.status(200).json({
            success:true,
            message:"Produit modifié avec succès",
            data:updatedProduct
        });


    } catch(error){

        console.error(error);

        res.status(500).json({
            success:false,
            message:"Erreur modification produit"
        });
    }
}



// DELETE /products/:id
async function removeProduct(req,res){

    try{

        const id = req.params.id;

        await Product.deleteProduct(id);


        res.status(200).json({
            success:true,
            message:"Produit supprimé avec succès"
        });


    }catch(error){

        console.error(error);

        res.status(500).json({
            success:false,
            message:"Erreur suppression produit"
        });
    }
}



module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    removeProduct
};

