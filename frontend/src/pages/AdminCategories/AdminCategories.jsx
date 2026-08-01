import { useEffect, useState } from "react";

import {
    getCategories,
    addCategory,
    deleteCategory
} from "../../services/categoryService";

function AdminCategories() {

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const token = localStorage.getItem("token");


    // ==============================
    // LOAD CATEGORIES
    // ==============================

    const loadCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    };


    useEffect(() => {

        loadCategories();

    }, []);


    // ==============================
    // ADD CATEGORY
    // ==============================

    const handleAdd = async (e) => {

        e.preventDefault();

        if (!name.trim()) {

            alert("Please enter a category name.");

            return;

        }

        try {

            await addCategory(name, token);

            alert("Category added successfully ❤️");

            setName("");

            loadCategories();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add category"
            );

        }

    };


    // ==============================
    // DELETE CATEGORY
    // ==============================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;


        try {

            await deleteCategory(id, token);

            alert("Category deleted successfully");

            loadCategories();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }

    };


    return (

        <div style={{
            padding: "40px",
            marginLeft: "260px"
        }}>

            <h1>
                Categories ✨
            </h1>


            <form
                onSubmit={handleAdd}
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "30px"
                }}
            >

                <input
                    type="text"
                    placeholder="Category name..."
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />


                <button type="submit">
                    + Add Category
                </button>

            </form>


            <table>

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Action</th>

                </tr>

                </thead>


                <tbody>

                {categories.map((category) => (

                    <tr key={category.id}>

                        <td>
                            {category.id}
                        </td>

                        <td>
                            {category.name}
                        </td>

                        <td>

                            <button
                                onClick={() =>
                                    handleDelete(category.id)
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}

export default AdminCategories;