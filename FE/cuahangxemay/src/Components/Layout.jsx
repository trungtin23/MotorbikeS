import React from "react";
import { Outlet, Link } from "react-router-dom";

const account = null;

const Layout = () => {
    return (
        <>
            <header
                className="bg-dark text-white"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    width: "100%",
                }}
            >
                {/* Topbar */}
                <div className="d-flex justify-content-end align-items-center px-3 py-2">
                    <span className="mr-3">Hello User</span>
                    <a href="#" className="px-2 text-white"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="px-2 text-white"><i className="fab fa-tiktok"></i></a>
                    <a href="#" className="px-2 text-white"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="px-2 text-white"><i className="fab fa-youtube"></i></a>
                </div>

                {/* Navbar */}
                <nav className="navbar navbar-expand-lg bg-secondary navbar-dark px-3 py-1">
                    <Link to="/home" className="navbar-brand d-flex align-items-center">
                        <img
                            src="/assets/user/Image/logo1-removebg-preview.png"
                            alt="Logo"
                            style={{ height: 70 }}
                        />
                        <h2 className="text-uppercase text-primary mb-0 ml-2" style={{ marginTop: 10 }}>
                            T-Motoshop
                        </h2>
                    </Link>

                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                        <div className="navbar-nav">
                            <Link to="/home" className="nav-item nav-link">Trang chủ</Link>
                            <Link to="/about" className="nav-item nav-link">Giới thiệu</Link>
                            <Link to="/service" className="nav-item nav-link">Dịch vụ</Link>
                            <Link to="/contact" className="nav-item nav-link">Liên hệ</Link>
                            <Link to="/motobike" className="nav-item nav-link">Xe máy</Link>

                            {/* User dropdown */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa-solid fa-user"></i>
                                </a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    {!account ? (
                                        <>
                                            <Link to="/login" className="dropdown-item">Đăng nhập</Link>
                                            <Link to="/cart" className="dropdown-item">
                                                <i className="fa-solid fa-bag-shopping" style={{ fontSize: "120%" }}></i>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/cart" className="dropdown-item">
                                                <i className="fa-solid fa-bag-shopping" style={{ fontSize: "120%" }}></i>
                                            </Link>
                                            <Link to="/appointcard" className="dropdown-item">
                                                <i className="fa-solid fa-sheet-plastic" style={{ fontSize: "120%" }}></i>
                                            </Link>
                                            <Link to="/information" className="dropdown-item">Thông tin</Link>
                                            <Link to="/changePassword" className="dropdown-item">Đổi mật khẩu</Link>
                                            <Link to="/login?action=logout" className="dropdown-item">
                                                <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginLeft: 5 }}></i>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Nội dung các page nằm dưới header */}
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
