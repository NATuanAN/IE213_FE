import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserbyId } from "../../services/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalUpdateUser from "../Admin/Content/ModalUpdateUser";

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.user.account);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);

    const handleOpenModal = () => {
        setUserToUpdate({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            image: user.userImage,
        });
        setShowModal(true);
    };

    const handleResetUpdateData = () => {
        setUserToUpdate(null);
    };

    const fetchUser = async () => {
        try {
            const res = await getUserbyId(id);
            if (res && res.EM === 0) {
                setUser(res.DT);
            } else {
                setError("User not found!");
            }
        } catch (e) {
            setError("Error fetching user");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser.role !== "ADMIN" && currentUser.id !== id) {
            toast.warning("You don't have permission to view this page!");
            navigate("/");
            return;
        }

        fetchUser();
    }, [id, currentUser, navigate]);

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (error) return <div className="container mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-5 p-4 bg-light rounded shadow-sm" style={{ maxWidth: "600px" }}>
            <h3 className="mb-4 text-primary fw-bold border-bottom pb-2">User Details</h3>

            {/* Ảnh user */}
            {user.userImage && (
                <div className="text-center mb-4">
                    <img
                        src={`http://localhost:8081/uploadsUser/${user.userImage}?t=${Date.now()}`}
                        alt="User avatar"
                        style={{ maxWidth: "150px", borderRadius: "50%" }}
                    />
                </div>
            )}

            <table className="table table-hover align-middle">
                <tbody>
                    <tr>
                        <th scope="row" style={{ width: "30%" }}>ID</th>
                        <td className="text-break">{user.id}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Username</th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th scope="row">Role</th>
                        <td>
                            <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                                {user.role}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

            {(currentUser.role === "ADMIN" || currentUser.id === user.id) && (
                <div className="mt-3 d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        ✏️ Edit User
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/users/change-password/${user.id}`)}
                    >
                        🔒 Change Password
                    </button>
                    {currentUser.role === "ADMIN" && (
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/admins/manage-users")}
                        >
                            &laquo; Back to Manage Users
                        </button>
                    )}
                </div>
            )}


            <ModalUpdateUser
                show={showModal}
                setShow={setShowModal}
                dataUpdate={userToUpdate}
                resetUpdateData={handleResetUpdateData}
                fetchListUserWithPaginate={fetchUser}
                currentPage={1}
            />
        </div>
    );
};

export default UserDetail;
