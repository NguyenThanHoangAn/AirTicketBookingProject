// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow">
            <Link className="navbar-brand" to="/"> 
                <img
                    src={logo}
                    alt="AirTripper"
                    style={{ width: '40px', maxHeight: '40px' }}
                />
                <span className="ms-2 fw-bold">AirTripper</span>
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/"> 
                            Đặt vé
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/flight-info">
                            Chuyến bay của tôi
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/support"> {/* Thêm liên kết đến trang hỗ trợ */}
                            Hỗ trợ
                        </Link>
                    </li>
                </ul>
                <div className="ms-auto mt-2">
                    <Link to="/login" className="btn btn-primary btn-sm me-2">
                        Đăng nhập
                    </Link>
                    <Link to="/register" className="btn btn-success btn-sm">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;