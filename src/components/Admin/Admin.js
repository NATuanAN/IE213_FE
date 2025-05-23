import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const role = useSelector((state) => state.user.account.role);

    useEffect(() => {
        if (role !== "ADMIN") {
            navigate("/unauthorized");
        }
    }, [role, navigate]);

    if (role !== "ADMIN") {
        return null; // Tránh hiển thị Admin layout
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
};

export default Admin;
