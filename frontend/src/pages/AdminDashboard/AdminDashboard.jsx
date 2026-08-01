import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line
} from "recharts";

import api from "../../services/api";
import "./AdminDashboard.css";


function AdminDashboard() {


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);


    const token =
        localStorage.getItem("token");



    // =====================================
    // LOAD ORDERS
    // =====================================

    const loadOrders = async () => {

        try {

            const response =
                await api.get("/orders", {

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }

                });


            setOrders(
                response.data.data || []
            );


        } catch (error) {

            console.error(
                "Dashboard orders error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        loadOrders();

    }, []);



    // =====================================
    // TOTAL SALES
    // =====================================

    const totalSales =
        orders.reduce(

            (sum, order) =>
                sum +
                Number(order.total || 0),

            0

        );



    // =====================================
    // PENDING ORDERS
    // =====================================

    const pendingOrders =
        orders.filter(

            order =>
                order.status === "Pending"

        ).length;



    // =====================================
    // CUSTOMERS
    // =====================================

    const customers =
        new Set(

            orders.map(
                order => order.userId
            )

        ).size;



    // =====================================
    // SALES CHART
    // =====================================

    const salesData = orders.reduce(

        (acc, order) => {

            const date =
                new Date(
                    order.createdAt
                );


            const month =
                date.toLocaleDateString(
                    "en-US",
                    {
                        month: "short"
                    }
                );


            const existing =
                acc.find(
                    item =>
                        item.month === month
                );


            if (existing) {

                existing.sales +=
                    Number(order.total || 0);

                existing.orders += 1;

            } else {

                acc.push({

                    month,

                    sales:
                        Number(
                            order.total || 0
                        ),

                    orders: 1

                });

            }


            return acc;

        },

        []

    );



    // =====================================
    // LAST 6 MONTHS
    // =====================================

    const monthlySales = [];


    for (
        let i = 5;
        i >= 0;
        i--
    ) {

        const date = new Date();

        date.setMonth(
            date.getMonth() - i
        );


        const month =
            date.toLocaleDateString(
                "en-US",
                {
                    month: "short"
                }
            );


        const found =
            salesData.find(
                item =>
                    item.month === month
            );


        monthlySales.push({

            month,

            sales:
                found
                    ? found.sales
                    : 0,

            orders:
                found
                    ? found.orders
                    : 0

        });

    }



    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="admin-dashboard-loading">

                Loading Dashboard... ✨

            </div>

        );

    }



    return (

        <div className="admin-dashboard">


            {/* =================================
                HEADER
            ================================= */}

            <div className="dashboard-header">


                <div>

                    <p className="dashboard-small-title">

                        Shopping By Amal

                    </p>


                    <h1>

                        Admin Dashboard

                    </h1>


                    <p className="dashboard-subtitle">

                        Manage your boutique and
                        customer orders

                    </p>

                </div>


                <div className="dashboard-actions">

                    <Link
                        to="/admin/products"
                        className="dashboard-btn"
                    >
                        Manage Products
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="dashboard-btn secondary"
                    >
                        View Orders
                    </Link>

                    <Link
                        to="/admin/reviews"
                        className="dashboard-btn secondary"
                    >
                        ⭐ Manage Reviews
                    </Link>

                    <Link
                        to="/admin/complaints"
                        className="dashboard-btn secondary"
                    >
                        📩 Manage Complaints
                    </Link>

                </div>

            </div>


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="stats-grid">


                <div className="stat-card">

                    <div className="stat-icon">

                        🛍️

                    </div>

                    <div>

                        <p>
                            Total Orders
                        </p>

                        <h2>
                            {orders.length}
                        </h2>

                    </div>

                </div>



                <div className="stat-card">

                    <div className="stat-icon">

                        💰

                    </div>

                    <div>

                        <p>
                            Total Sales
                        </p>

                        <h2>
                            {totalSales.toFixed(2)} DT
                        </h2>

                    </div>

                </div>



                <div className="stat-card">

                    <div className="stat-icon">

                        👥

                    </div>

                    <div>

                        <p>
                            Customers
                        </p>

                        <h2>
                            {customers}
                        </h2>

                    </div>

                </div>



                <div className="stat-card">

                    <div className="stat-icon">

                        ⏳

                    </div>

                    <div>

                        <p>
                            Pending Orders
                        </p>

                        <h2>
                            {pendingOrders}
                        </h2>

                    </div>

                </div>


            </div>



            {/* =================================
                SALES CHART
            ================================= */}

            <div className="charts-grid">


                <div className="chart-card">


                    <div className="chart-header">

                        <div>

                            <h2>
                                Sales Overview 📊
                            </h2>

                            <p>
                                Monthly sales performance
                            </p>

                        </div>

                    </div>


                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={monthlySales}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                />

                                <YAxis />

                                <Tooltip
                                    formatter={(value) =>
                                        `${Number(value).toFixed(2)} DT`
                                    }
                                />

                                <Bar
                                    dataKey="sales"
                                    name="Sales"
                                    radius={[
                                        8,
                                        8,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>



                {/* =================================
                    ORDERS CHART
                ================================= */}

                <div className="chart-card">


                    <div className="chart-header">

                        <div>

                            <h2>
                                Orders Overview 📈
                            </h2>

                            <p>
                                Number of orders per month
                            </p>

                        </div>

                    </div>


                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <LineChart
                                data={monthlySales}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                />

                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="orders"
                                    name="Orders"
                                    strokeWidth={3}
                                    dot={{
                                        r: 5
                                    }}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>


            </div>



            {/* =================================
                RECENT ORDERS
            ================================= */}

            <div className="recent-orders">


                <div className="section-header">


                    <div>

                        <h2>
                            Recent Orders
                        </h2>

                        <p>
                            Latest customer purchases
                        </p>

                    </div>


                    <Link
                        to="/admin/orders"
                    >

                        View All →

                    </Link>


                </div>



                {orders.length === 0 ? (

                    <div className="empty-orders">

                        <div>
                            🧾
                        </div>

                        <h3>
                            No orders yet
                        </h3>

                        <p>
                            Customer orders will
                            appear here.
                        </p>

                    </div>

                ) : (

                    <div className="orders-table-wrapper">


                        <table className="dashboard-orders-table">


                            <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    Client
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Total
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                            </thead>



                            <tbody>


                            {orders
                                .slice(0, 5)
                                .map(order => (

                                    <tr
                                        key={order.id}
                                    >


                                        <td>
                                            #{order.id}
                                        </td>


                                        <td>

                                            <td>

                                                <div className="client-info">

                                                    <strong>
                                                        {order.fullName || order.customerName || "Client"}
                                                    </strong>

                                                    <small>
                                                        {order.email || order.customerEmail || ""}
                                                    </small>

                                                </div>

                                            </td>

                                        </td>


                                        <td>

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString(
                                                "fr-FR"
                                            )}

                                        </td>


                                        <td>

                                            <strong>

                                                {Number(
                                                    order.total
                                                ).toFixed(2)} DT

                                            </strong>

                                        </td>


                                        <td>

                                            <span
                                                className={`status ${order.status?.toLowerCase()}`}
                                            >

                                                {order.status}

                                            </span>

                                        </td>


                                    </tr>

                                ))}


                            </tbody>


                        </table>


                    </div>

                )}


            </div>


        </div>

    );

}


export default AdminDashboard;