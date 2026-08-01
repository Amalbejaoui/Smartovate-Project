import api from "./api";

// ======================
// GET ALL PRODUCTS
// ======================
export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

// ======================
// ADD PRODUCT
// ======================
export const addProduct = async (product, token) => {
    const response = await api.post("/products", product, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// ======================
// UPDATE PRODUCT
// ======================
export const updateProduct = async (id, product, token) => {
    const response = await api.put(`/products/${id}`, product, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// ======================
// DELETE PRODUCT
// ======================
export const deleteProduct = async (id, token) => {
    const response = await api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};