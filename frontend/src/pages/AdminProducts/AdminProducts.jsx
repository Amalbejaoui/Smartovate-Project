import { useEffect, useState } from "react";

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "../../services/productService";

import api from "../../services/api";

import "./AdminProducts.css";


function AdminProducts() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);

    const [form, setForm] = useState({

        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        imageUrl: ""

    });

    const token = localStorage.getItem("token");


    // =====================================
    // LOAD PRODUCTS
    // =====================================

    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data.data || []);

        } catch (error) {

            console.log("Error loading products:", error);

        }

    };


    // =====================================
    // LOAD CATEGORIES
    // =====================================

    const loadCategories = async () => {

        try {

            const response = await api.get("/categories");

            console.log("Categories API:", response.data);

            setCategories(response.data.data || []);

        } catch (error) {

            console.log("Error loading categories:", error);

            setCategories([]);

        }

    };


    // =====================================
    // INITIAL LOAD
    // =====================================

    useEffect(() => {

        const loadData = async () => {

            setLoading(true);

            await Promise.all([
                loadProducts(),
                loadCategories()
            ]);

            setLoading(false);

        };

        loadData();

    }, []);


    // =====================================
    // IMAGE -> BASE64
    // =====================================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;


        // Check image type

        if (!file.type.startsWith("image/")) {

            alert("Please select an image.");

            return;

        }


        // Check size - 2MB

        if (file.size > 2 * 1024 * 1024) {

            alert("Image must be smaller than 2MB.");

            return;

        }


        const reader = new FileReader();


        reader.onloadend = () => {

            setForm({

                ...form,

                imageUrl: reader.result

            });

        };


        reader.readAsDataURL(file);

    };


    // =====================================
    // INPUT CHANGE
    // =====================================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    // =====================================
    // OPEN ADD FORM
    // =====================================

    const handleAdd = () => {

        setEditingProduct(null);

        setForm({

            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            imageUrl: ""

        });

        setShowForm(true);

    };


    // =====================================
    // OPEN EDIT FORM
    // =====================================

    const handleEdit = (product) => {

        setEditingProduct(product);

        setForm({

            name: product.name || "",

            description: product.description || "",

            price: product.price || "",

            stock: product.stock || "",

            categoryId: product.categoryId || "",

            imageUrl: product.imageUrl || ""

        });

        setShowForm(true);

    };


    // =====================================
    // SUBMIT FORM
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!form.name.trim()) {

            alert("Product name is required.");

            return;

        }


        if (!form.price || Number(form.price) < 0) {

            alert("Please enter a valid price.");

            return;

        }


        if (!form.stock || Number(form.stock) < 0) {

            alert("Please enter a valid stock.");

            return;

        }


        if (!form.categoryId) {

            alert("Please select a category.");

            return;

        }


        try {

            const productData = {

                name: form.name,

                description: form.description,

                price: Number(form.price),

                stock: Number(form.stock),

                categoryId: Number(form.categoryId),

                imageUrl: form.imageUrl

            };


            if (editingProduct) {

                await updateProduct(
                    editingProduct.id,
                    productData,
                    token
                );

                alert("Product updated successfully ✨");

            } else {

                await addProduct(
                    productData,
                    token
                );

                alert("Product added successfully 🛍️");

            }


            setShowForm(false);

            setEditingProduct(null);

            await loadProducts();


        } catch (error) {

            console.log("Save product error:", error);

            alert(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };


    // =====================================
    // DELETE
    // =====================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;


        try {

            await deleteProduct(id, token);

            alert("Product deleted successfully.");

            await loadProducts();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Delete failed."
            );

        }

    };


    // =====================================
    // CLOSE FORM
    // =====================================

    const closeForm = () => {

        setShowForm(false);

        setEditingProduct(null);

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="admin-products">

                <div className="loading-admin">

                    Loading products... 🛍️

                </div>

            </div>

        );

    }


    return (

        <div className="admin-products">


            {/* =================================
                TOP BAR
            ================================= */}

            <div className="top-bar">

                <div>

                    <h1>
                        Products ✨
                    </h1>

                    <p className="subtitle">
                        Manage your boutique collection
                    </p>

                </div>


                <button
                    className="add-btn"
                    onClick={handleAdd}
                >

                    + Add Product

                </button>

            </div>


            {/* =================================
                TABLE
            ================================= */}

            <table>

                <thead>

                <tr>

                    <th>Image</th>

                    <th>Name</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Actions</th>

                </tr>

                </thead>


                <tbody>

                {products.length === 0 ? (

                    <tr>

                        <td
                            colSpan="6"
                            className="no-products"
                        >

                            No products yet 🛍️

                        </td>

                    </tr>

                ) : (

                    products.map(product => (

                        <tr key={product.id}>


                            {/* IMAGE */}

                            <td>

                                {product.imageUrl ? (

                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                    />

                                ) : (

                                    <div className="no-image">
                                        🛍️
                                    </div>

                                )}

                            </td>


                            {/* NAME */}

                            <td>

                                <strong>
                                    {product.name}
                                </strong>

                            </td>


                            {/* CATEGORY */}

                            <td>

                                {

                                    categories.find(
                                        category =>
                                            Number(category.id) ===
                                            Number(product.categoryId)
                                    )?.name || "Unknown"

                                }

                            </td>


                            {/* PRICE */}

                            <td>

                                {product.price} DT

                            </td>


                            {/* STOCK */}

                            <td>

                                <span
                                    className={
                                        product.stock > 0
                                            ? "stock-ok"
                                            : "stock-out"
                                    }
                                >

                                    {product.stock}

                                </span>

                            </td>


                            {/* ACTIONS */}

                            <td>

                                <button
                                    className="edit"
                                    onClick={() =>
                                        handleEdit(product)
                                    }
                                >

                                    Edit

                                </button>


                                <button
                                    className="delete"
                                    onClick={() =>
                                        handleDelete(product.id)
                                    }
                                >

                                    Delete

                                </button>

                            </td>


                        </tr>

                    ))

                )}

                </tbody>

            </table>


            {/* =================================
                ADD / EDIT MODAL
            ================================= */}

            {showForm && (

                <div
                    className="modal-overlay"
                    onClick={closeForm}
                >

                    <div
                        className="product-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* HEADER */}

                        <div className="modal-header">

                            <div>

                                <h2>

                                    {editingProduct
                                        ? "Edit Product ✨"
                                        : "Add New Product ✨"
                                    }

                                </h2>

                                <p>

                                    {editingProduct
                                        ? "Update product information"
                                        : "Create a new product for your boutique"
                                    }

                                </p>

                            </div>


                            <button
                                className="close-btn"
                                onClick={closeForm}
                            >

                                ×

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            className="product-form"
                            onSubmit={handleSubmit}
                        >


                            {/* IMAGE */}

                            <div className="image-upload-section">

                                <label>
                                    Product Image
                                </label>


                                <div className="image-preview">

                                    {form.imageUrl ? (

                                        <img
                                            src={form.imageUrl}
                                            alt="Preview"
                                        />

                                    ) : (

                                        <div className="image-placeholder">

                                            🛍️

                                            <span>
                                                No image
                                            </span>

                                        </div>

                                    )}

                                </div>


                                <label
                                    className="upload-btn"
                                >

                                    📷 Choose Image

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />

                                </label>


                                <small>
                                    JPG, PNG or WEBP • Max 2MB
                                </small>

                            </div>


                            {/* NAME */}

                            <div className="form-group">

                                <label>
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Example: Elegant Dress"
                                    required
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product..."
                                    rows="3"
                                />

                            </div>


                            {/* PRICE + STOCK */}

                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        value={form.stock}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                        required
                                    />

                                </div>

                            </div>


                            {/* CATEGORY */}

                            <div className="form-group">

                                <label>
                                    Category
                                </label>


                                <select
                                    name="categoryId"
                                    value={form.categoryId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select a category
                                    </option>


                                    {categories.map(category => (

                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >

                                            {category.name}

                                        </option>

                                    ))}

                                </select>


                                {categories.length === 0 && (

                                    <small className="category-warning">

                                        No categories available.
                                        Please create a category first.

                                    </small>

                                )}

                            </div>


                            {/* BUTTONS */}

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={closeForm}
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="save-btn"
                                >

                                    {editingProduct
                                        ? "Save Changes ✨"
                                        : "Add Product 🛍️"
                                    }

                                </button>

                            </div>


                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}


export default AdminProducts;