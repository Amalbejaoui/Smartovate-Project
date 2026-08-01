const Product = require("../models/productModel");


// ===================================
// GET ALL PRODUCTS
// ===================================
async function getProducts(req, res) {

    try {

        const products =
            await Product.getAllProducts();

        res.status(200).json({

            success: true,

            data: products

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Erreur lors de la récupération des produits."

        });

    }

}


// ===================================
// GET PRODUCT BY ID
// ===================================
async function getProductById(req, res) {

    try {

        const id = req.params.id;

        const product =
            await Product.getProductById(id);


        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Produit introuvable."

            });

        }


        res.status(200).json({

            success: true,

            data: product

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Erreur lors de la récupération du produit."

        });

    }

}


// ===================================
// ADD PRODUCT
// ===================================
async function addProduct(req, res) {

    try {

        const newProduct =
            await Product.createProduct(req.body);

        res.status(201).json({

            success: true,

            message:
                "Produit ajouté avec succès.",

            data: newProduct

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Erreur lors de l'ajout du produit."

        });

    }

}


// ===================================
// UPDATE PRODUCT
// ===================================
async function updateProduct(req, res) {

    try {

        const id = req.params.id;

        const updatedProduct =
            await Product.updateProduct(
                id,
                req.body
            );


        if (!updatedProduct) {

            return res.status(404).json({

                success: false,

                message:
                    "Produit introuvable."

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Produit modifié avec succès.",

            data: updatedProduct

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Erreur modification produit."

        });

    }

}


// ===================================
// DELETE PRODUCT
// ===================================
async function removeProduct(req, res) {

    try {

        const id = req.params.id;

        const deleted =
            await Product.deleteProduct(id);


        if (!deleted) {

            return res.status(404).json({

                success: false,

                message:
                    "Produit introuvable."

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Produit supprimé avec succès."

        });

    } catch (error) {

        console.error(error);


        if (
            error.message.includes(
                "existing order"
            )
        ) {

            return res.status(409).json({

                success: false,

                message:
                    "Ce produit appartient à une commande existante. Il ne peut pas être supprimé."

            });

        }


        res.status(500).json({

            success: false,

            message:
                "Erreur suppression produit."

        });

    }

}


module.exports = {

    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct

};