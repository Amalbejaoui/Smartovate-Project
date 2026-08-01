import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminComplaints.css";

function AdminComplaints() {

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [reply, setReply] = useState({});

    const token = localStorage.getItem("token");


    // ==============================
    // LOAD COMPLAINTS
    // ==============================

    const loadComplaints = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/complaints",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "Complaints:",
                response.data
            );

            setComplaints(
                response.data.data || []
            );

        } catch (error) {

            console.log(
                "Error loading complaints:",
                error
            );

            setComplaints([]);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadComplaints();

    }, []);


    // ==============================
    // UPDATE COMPLAINT
    // ==============================

    const updateComplaint = async (
        id,
        status
    ) => {

        try {

            await api.put(
                `/complaints/${id}`,
                {
                    status,
                    adminReply:
                        reply[id] || ""
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Complaint updated successfully ✨"
            );

            loadComplaints();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update complaint."
            );

        }

    };


    // ==============================
    // DELETE
    // ==============================

    const deleteComplaint = async (id) => {

        if (!window.confirm(
            "Delete this complaint?"
        )) {

            return;

        }

        try {

            await api.delete(
                `/complaints/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Complaint deleted successfully."
            );

            loadComplaints();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete complaint."
            );

        }

    };


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (

            <div className="admin-complaints-page">

                <div className="admin-complaints-loading">

                    Loading complaints... 📝

                </div>

            </div>

        );

    }


    return (

        <div className="admin-complaints-page">


            {/* HEADER */}

            <div className="admin-complaints-header">

                <div>

                    <h1>
                        Customer Complaints 📝
                    </h1>

                    <p>
                        Manage customer complaints and requests
                    </p>

                </div>


                <div className="complaints-count">

                    {complaints.length} Complaints

                </div>

            </div>


            {/* EMPTY */}

            {complaints.length === 0 ? (

                <div className="admin-no-complaints">

                    <div className="complaint-empty-icon">
                        📝
                    </div>

                    <h2>
                        No complaints
                    </h2>

                    <p>
                        Customer complaints will appear here.
                    </p>

                </div>

            ) : (

                <div className="admin-complaints-list">

                    {complaints.map((complaint) => (

                        <div
                            className="admin-complaint-card"
                            key={complaint.id}
                        >


                            {/* TOP */}

                            <div className="complaint-top">

                                <div>

                                    <span>
                                        Complaint #{complaint.id}
                                    </span>

                                    <h2>
                                        {complaint.subject}
                                    </h2>

                                </div>


                                <span
                                    className={`complaint-status ${complaint.status?.toLowerCase()}`}
                                >
                                    {complaint.status}
                                </span>

                            </div>


                            {/* CUSTOMER */}

                            <div className="complaint-customer">

                                <div>

                                    <span>
                                        Customer
                                    </span>

                                    <strong>
                                        👤 {complaint.customerName}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Email
                                    </span>

                                    <strong>
                                        {complaint.customerEmail}
                                    </strong>

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div className="complaint-message">

                                <span>
                                    Customer message
                                </span>

                                <p>
                                    {complaint.message}
                                </p>

                            </div>


                            {/* REPLY */}

                            <div className="complaint-reply">

                                <label>
                                    Admin reply
                                </label>

                                <textarea
                                    rows="3"
                                    value={
                                        reply[complaint.id] ??
                                        complaint.adminReply ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        setReply({
                                            ...reply,
                                            [complaint.id]:
                                            e.target.value
                                        })
                                    }
                                    placeholder="Write a reply to the customer..."
                                />

                            </div>


                            {/* ACTIONS */}

                            <div className="complaint-actions">


                                <select
                                    value={
                                        complaint.status ||
                                        "Pending"
                                    }
                                    onChange={(e) =>
                                        updateComplaint(
                                            complaint.id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Resolved">
                                        Resolved
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                </select>


                                <button
                                    className="save-complaint-btn"
                                    onClick={() =>
                                        updateComplaint(
                                            complaint.id,
                                            complaint.status
                                        )
                                    }
                                >
                                    Save Reply ✨
                                </button>


                                <button
                                    className="delete-complaint-btn"
                                    onClick={() =>
                                        deleteComplaint(
                                            complaint.id
                                        )
                                    }
                                >
                                    Delete 🗑️
                                </button>

                            </div>


                            {/* EXISTING REPLY */}

                            {complaint.adminReply && (

                                <div className="existing-reply">

                                    <strong>
                                        Admin reply:
                                    </strong>

                                    <p>
                                        {complaint.adminReply}
                                    </p>

                                </div>

                            )}


                            <div className="complaint-date">

                                Created:{" "}

                                {new Date(
                                    complaint.createdAt
                                ).toLocaleDateString(
                                    "en-GB"
                                )}

                            </div>


                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default AdminComplaints;