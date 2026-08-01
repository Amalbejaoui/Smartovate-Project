const Category = require("../models/categoryModel");

// ==============================
// GET ALL CATEGORIES
// ==============================
async function getCategories(req, res) {

    try {

        const categories = await Category.getAllCategories();

        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des catégories."
        });

    }
}


// ==============================
// CREATE CATEGORY
// ==============================
async function addCategory(req, res) {

    try {

        const { name } = req.body;

        if (!name || name.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });

        }

        const category = await Category.createCategory(name);

        res.status(201).json({
            success: true,
            message: "Catégorie ajoutée avec succès.",
            data: category
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de l'ajout de la catégorie."
        });

    }
}


// ==============================
// DELETE CATEGORY
// ==============================
async function removeCategory(req, res) {

    try {

        const id = req.params.id;

        await Category.deleteCategory(id);

        res.status(200).json({
            success: true,
            message: "Catégorie supprimée avec succès."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression de la catégorie."
        });

    }
}


module.exports = {
    getCategories,
    addCategory,
    removeCategory
};