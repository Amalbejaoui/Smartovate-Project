import { useEffect, useState } from "react";
import api from "../../services/api";
import { jsPDF } from "jspdf";
import "./AdminOrders.css";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");


    // =====================================
    // LOAD ORDERS
    // =====================================

    const loadOrders = async () => {

        try {

            setLoading(true);

            const response = await api.get("/orders", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            console.log("Orders API:", response.data);

            setOrders(response.data.data || []);

        } catch (error) {

            console.log("Error loading orders:", error);

            setOrders([]);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadOrders();

    }, []);


    // =====================================
    // UPDATE STATUS
    // =====================================

    const updateStatus = async (orderId, status) => {

        try {

            await api.put(
                `/orders/${orderId}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order status updated successfully ✨");

            loadOrders();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update order."
            );

        }

    };


    // =====================================
    // DOWNLOAD ORDER PDF
    // =====================================

    const downloadPDF = (order) => {

        try {

            const doc = new jsPDF();

            // =========================
            // TITLE
            // =========================

            doc.setFontSize(22);

            doc.setTextColor(183, 110, 121);

            doc.text(
                "Shopping By Amal",
                20,
                20
            );


            doc.setFontSize(16);

            doc.setTextColor(50, 50, 50);

            doc.text(
                "Order Invoice",
                20,
                32
            );


            // =========================
            // ORDER INFORMATION
            // =========================

            doc.setFontSize(11);

            doc.setTextColor(80, 80, 80);

            doc.text(
                `Order #: ${order.orderId}`,
                20,
                48
            );

            doc.text(
                `Customer: ${order.customerName}`,
                20,
                56
            );

            doc.text(
                `Email: ${order.customerEmail}`,
                20,
                64
            );

            doc.text(
                `Status: ${order.status}`,
                20,
                72
            );

            doc.text(
                `Date: ${new Date(
                    order.createdAt
                ).toLocaleDateString("en-GB")}`,
                20,
                80
            );


            // =========================
            // PRODUCTS HEADER
            // =========================

            doc.setFillColor(
                250,
                240,
                244
            );

            doc.rect(
                20,
                92,
                170,
                10,
                "F"
            );

            doc.setFontSize(11);

            doc.setTextColor(
                70,
                70,
                70
            );

            doc.text(
                "Product",
                25,
                99
            );

            doc.text(
                "Qty",
                125,
                99
            );

            doc.text(
                "Price",
                145,
                99
            );

            doc.text(
                "Total",
                170,
                99
            );


            // =========================
            // PRODUCTS
            // =========================

            let y = 112;

            order.products.forEach(
                (product) => {

                    const quantity =
                        Number(product.quantity);

                    const price =
                        Number(product.price);

                    const total =
                        quantity * price;


                    doc.setTextColor(
                        60,
                        60,
                        60
                    );

                    doc.text(
                        product.name.substring(
                            0,
                            35
                        ),
                        25,
                        y
                    );

                    doc.text(
                        String(quantity),
                        127,
                        y
                    );

                    doc.text(
                        `${price.toFixed(2)} DT`,
                        145,
                        y
                    );

                    doc.text(
                        `${total.toFixed(2)} DT`,
                        170,
                        y
                    );


                    y += 10;


                    // New page if necessary

                    if (y > 260) {

                        doc.addPage();

                        y = 20;

                    }

                }
            );


            // =========================
            // TOTAL
            // =========================

            y += 10;

            doc.setDrawColor(
                220,
                220,
                220
            );

            doc.line(
                20,
                y,
                190,
                y
            );


            y += 15;

            doc.setFontSize(14);

            doc.setTextColor(
                183,
                110,
                121
            );

            doc.text(
                `TOTAL: ${Number(
                    order.total
                ).toFixed(2)} DT`,
                130,
                y
            );


            // =========================
            // FOOTER
            // =========================

            doc.setFontSize(9);

            doc.setTextColor(
                130,
                130,
                130
            );

            doc.text(
                "Thank you for shopping with Shopping By Amal ❤️",
                20,
                285
            );


            // =========================
            // SAVE
            // =========================

            doc.save(
                `Order_${order.orderId}_ShoppingByAmal.pdf`
            );

        } catch (error) {

            console.log(
                "PDF ERROR:",
                error
            );

            alert(
                "Unable to generate PDF."
            );

        }

    };


    // =====================================
    // GROUP ORDERS
    // =====================================

    const groupedOrders = orders.reduce(
        (acc, item) => {

            if (!acc[item.orderId]) {

                acc[item.orderId] = {

                    orderId: item.orderId,

                    customerName:
                    item.customerName,

                    customerEmail:
                    item.customerEmail,

                    total: item.total,

                    status: item.status,

                    createdAt:
                    item.createdAt,

                    products: []

                };

            }


            acc[item.orderId].products.push({

                name:
                item.productName,

                quantity:
                item.quantity,

                price:
                item.price,

                image:
                item.productImage

            });


            return acc;

        },
        {}
    );


    const orderList =
        Object.values(groupedOrders);


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="admin-orders-page">

                <div className="orders-loading">

                    Loading orders... 📦

                </div>

            </div>

        );

    }


    return (

        <div className="admin-orders-page">


            {/* =========================
                HEADER
            ========================= */}

            <div className="orders-header">

                <div>

                    <h1>
                        Customer Orders 📦
                    </h1>

                    <p>
                        Manage orders and customer purchases
                    </p>

                </div>


                <div className="orders-count">

                    {orderList.length} Orders

                </div>

            </div>


            {/* =========================
                NO ORDERS
            ========================= */}

            {orderList.length === 0 ? (

                <div className="no-orders">

                    <div className="no-orders-icon">
                        🛍️
                    </div>

                    <h2>
                        No orders yet
                    </h2>

                    <p>
                        Customer orders will appear here.
                    </p>

                </div>

            ) : (


                <div className="orders-list">


                    {orderList.map(order => (

                        <div
                            className="order-card"
                            key={order.orderId}
                        >


                            {/* =========================
                                ORDER HEADER
                            ========================= */}

                            <div className="order-top">


                                <div>

                                    <span className="order-label">
                                        Order
                                    </span>

                                    <h2>
                                        #{order.orderId}
                                    </h2>

                                </div>


                                <div className="order-date">

                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        }
                                    )}

                                    {" "}

                                    {new Date(
                                        order.createdAt
                                    ).toLocaleTimeString(
                                        "en-GB",
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        }
                                    )}

                                </div>


                            </div>


                            {/* =========================
                                CUSTOMER
                            ========================= */}

                            <div className="customer-info">

                                <div>

                                    <span>
                                        Customer
                                    </span>

                                    <strong>
                                        👤 {order.customerName}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Email
                                    </span>

                                    <strong>
                                        {order.customerEmail}
                                    </strong>

                                </div>


                            </div>


                            {/* =========================
                                PRODUCTS
                            ========================= */}

                            <div className="ordered-products">

                                <h3>
                                    Products
                                </h3>


                                {order.products.map(
                                    (product, index) => (

                                        <div
                                            className="ordered-product"
                                            key={index}
                                        >


                                            <div className="product-image">

                                                {product.image ? (

                                                    <img
                                                        src={
                                                            product.image
                                                        }
                                                        alt={
                                                            product.name
                                                        }
                                                    />

                                                ) : (

                                                    <span>
                                                        🛍️
                                                    </span>

                                                )}

                                            </div>


                                            <div className="product-details">

                                                <strong>
                                                    {product.name}
                                                </strong>

                                                <span>
                                                    Quantity: {
                                                    product.quantity
                                                }
                                                </span>

                                            </div>


                                            <div className="product-price">

                                                {Number(
                                                    product.price
                                                ).toFixed(2)} DT

                                            </div>


                                        </div>

                                    )
                                )}

                            </div>


                            {/* =========================
                                TOTAL + STATUS
                            ========================= */}

                            <div className="order-bottom">


                                <div className="order-total">

                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        {Number(
                                            order.total
                                        ).toFixed(2)} DT
                                    </strong>

                                </div>


                                <div className="status-section">

                                    <label>
                                        Status
                                    </label>


                                    <select

                                        value={
                                            order.status
                                        }

                                        onChange={(e) =>
                                            updateStatus(
                                                order.orderId,
                                                e.target.value
                                            )
                                        }

                                    >

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Confirmed">
                                            Confirmed
                                        </option>

                                        <option value="Shipped">
                                            Shipped
                                        </option>

                                        <option value="Delivered">
                                            Delivered
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>


                                    {/* =========================
                                        PDF BUTTON
                                    ========================= */}

                                    <button
                                        className="pdf-button"
                                        onClick={() =>
                                            downloadPDF(order)
                                        }
                                    >
                                        📄 Download PDF
                                    </button>


                                </div>


                            </div>


                        </div>

                    ))}


                </div>

            )}

        </div>

    );

}


export default AdminOrders;