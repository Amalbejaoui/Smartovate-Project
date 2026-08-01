import api from "./api";


// =======================================
// CREATE ORDER
// =======================================

export const createOrder = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.post(
        "/orders",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};


// =======================================
// GET MY ORDERS
// =======================================

export const getMyOrders = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        "/orders/my",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};


// =======================================
// GET ALL ORDERS - ADMIN
// =======================================

export const getAllOrders = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        "/orders",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};


// =======================================
// UPDATE ORDER STATUS
// =======================================

export const updateOrderStatus = async (
    id,
    status
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.put(
        `/orders/${id}/status`,
        {
            status
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};