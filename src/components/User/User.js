// src/pages/UserDetail.jsx
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
        <div className="container mt-5">
            <h3>User Details</h3>
            <table className="table table-bordered mt-3">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{user.role}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserDetail;
