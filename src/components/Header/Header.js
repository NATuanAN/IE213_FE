import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { doLogout } from '../../redux/action/userAction';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(doLogout());
        // Nếu bạn lưu token trong localStorage, xóa luôn:
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login"); // chuyển về trang login hoặc homepage
    };
    const handleLogin = () => {
        navigate("/login");
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">
                    GROUP 14
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>

                        {account.role === "ADMIN" && (
                            <NavLink to="/admins" className="nav-link">Admin</NavLink>
                        )}
                    </Nav>

                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        handleLogin();
                                    }}
                                >
                                    Log in
                                </button>
                                <button className="btn-signup">Sign up</button>
                            </>
                        ) : (
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => {
                                    if (account.role === "USER") {
                                        navigate(`/manage-users/${account.id}`);
                                    } else if (account.role === "ADMIN") {
                                        navigate(`/manage-users/${account.id}`);
                                    }
                                }}>
                                    Profile
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={handleLogout}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>

                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
