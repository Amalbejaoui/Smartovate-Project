import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ClientComplaints.css";

function ClientComplaints() {

    const [complaints, setComplaints] = useState([]);

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);


    const token = localStorage.getItem("token");


    // =====================================
    // LOAD MY COMPLAINTS
    // =====================================

    const loadComplaints = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/complaints/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
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


    // =====================================
    // SUBMIT COMPLAINT
    // =====================================

    const submitComplaint = async (e) => {

        e.preventDefault();


        if (!subject.trim() || !message.trim()) {

            alert(
                "Please fill in all fields."
            );

            return;

        }


        try {

            setSending(true);


            await api.post(
                "/complaints",
                {
                    subject,
                    message
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            alert(
                "Your complaint has been submitted successfully ❤️"
            );


            setSubject("");
            setMessage("");


            loadComplaints();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to submit complaint."
            );

        } finally {

            setSending(false);

        }

    };


    // =====================================
    // STATUS CLASS
    // =====================================

    const getStatusClass = (status) => {

        switch (status) {

            case "Pending":
                return "status-pending";

            case "In Progress":
                return "status-progress";

            case "Resolved":
                return "status-resolved";

            case "Rejected":
                return "status-rejected";

            default:
                return "";

        }

    };


    return (

        <div className="client-complaints-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="complaints-header">

                <h1>
                    My Complaints 📝
                </h1>

                <p>
                    Have a problem with your order?
                    We're here to help.
                </p>

            </div>



            {/* =================================
                CREATE COMPLAINT
            ================================= */}

            <div className="complaint-form-card">

                <h2>
                    Send us a message 💌
                </h2>

                <p>
                    Tell us what happened and our
                    team will get back to you.
                </p>


                <form onSubmit={submitComplaint}>


                    <div className="form-group">

                        <label>
                            Subject
                        </label>

                        <input

                            type="text"

                            placeholder="Example: Problem with my order"

                            value={subject}

                            onChange={(e) =>
                                setSubject(e.target.value)
                            }

                            maxLength={200}

                        />

                    </div>



                    <div className="form-group">

                        <label>
                            Message
                        </label>

                        <textarea

                            placeholder="Describe your problem..."

                            value={message}

                            onChange={(e) =>
                                setMessage(e.target.value)
                            }

                            rows="6"

                        />

                    </div>



                    <button
                        type="submit"
                        disabled={sending}
                    >

                        {sending
                            ? "Sending..."
                            : "Send Complaint 💌"
                        }

                    </button>


                </form>

            </div>



            {/* =================================
                MY COMPLAINTS
            ================================= */}

            <div className="complaints-list-section">

                <h2>
                    My Previous Complaints
                </h2>


                {loading ? (

                    <div className="complaints-loading">

                        Loading complaints...

                    </div>

                ) : complaints.length === 0 ? (

                    <div className="no-complaints">

                        <div>
                            💬
                        </div>

                        <h3>
                            No complaints yet
                        </h3>

                        <p>
                            If you have a problem,
                            you can contact us using
                            the form above.
                        </p>

                    </div>

                ) : (

                    <div className="complaints-list">

                        {complaints.map((complaint) => (

                            <div
                                className="complaint-card"
                                key={complaint.id}
                            >


                                <div className="complaint-top">

                                    <div>

                                        <span>
                                            Complaint #{complaint.id}
                                        </span>

                                        <h3>
                                            {complaint.subject}
                                        </h3>

                                    </div>


                                    <span
                                        className={`complaint-status ${getStatusClass(
                                            complaint.status
                                        )}`}
                                    >
                                        {complaint.status}
                                    </span>

                                </div>



                                <div className="complaint-message">

                                    <span>
                                        Your message
                                    </span>

                                    <p>
                                        {complaint.message}
                                    </p>

                                </div>



                                {complaint.adminReply && (

                                    <div className="admin-reply">

                                        <div className="reply-title">

                                            💗 Admin Response

                                        </div>

                                        <p>
                                            {complaint.adminReply}
                                        </p>

                                    </div>

                                )}



                                <div className="complaint-date">

                                    Submitted:

                                    {" "}

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

        </div>

    );

}


export default ClientComplaints;