import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postChangePassword } from "../../services/apiService";

const ChangePass = () => {
    const { id } = useParams(); // id user lấy từ URL param
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const data = await postChangePassword(id, oldPassword, newPassword); // dùng id, oldPassword, newPassword
            if (data.EC === 0) {
                toast.success(data.EM);
                navigate(-1); // Đổi thành công thì quay lại trang trước
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            toast.error("Error in server or internet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="mb-4 text-primary fw-bold">Change Password</h3>
            <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={handleChangePassword}
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
};

export default ChangePass;
