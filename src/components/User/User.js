import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserbyId } from "../../services/apiService";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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

        fetchUser();
    }, [id]);

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (error) return <div className="container mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-5 p-4 bg-light rounded shadow-sm" style={{ maxWidth: "600px" }}>
            <h3 className="mb-4 text-primary fw-bold border-bottom pb-2">User Details</h3>

            {/* Ảnh user */}
            {user.userImage && (
                <div className="text-center mb-4">
                    <img
                        src={`http://localhost:8081/uploadsUser/${user.userImage}`}
                        alt="User avatar"
                        style={{ maxWidth: "150px", borderRadius: "50%" }}
                    />
                </div>
            )}

            <table className="table table-hover align-middle">
                <tbody>
                    <tr>
                        <th scope="row" style={{ width: "30%" }}>ID</th>
                        <td className="text-break">{user._id || user.id}</td>
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
        </div>
    );
};

export default UserDetail;
