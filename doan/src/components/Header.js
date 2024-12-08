import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/"> 
        <img
          src={logo}
          alt="AirTripper"
          style={{ width: '40px', maxHeight: '40px' }}
        />
      </Link>

      {/* Burger menu toggle button */}
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

      {/* Collapsible menu */}
      <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#booking">
              Đặt vé
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#flightInfo">
              Thông tin chuyến bay
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#support">
              Hỗ trợ
            </a>
          </li>
        </ul>
        <form className="d-flex mx-3" style={{ maxWidth: '300px', width: '100%' }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: '100%' }}
          />
          <button
            className="btn btn-outline-dark btn-sm"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="ms-auto mt-2"> {/* Add margin-top: 2px to create some space */}
          <button
            className="btn btn-primary btn-sm me-2"
          >
            Đăng nhập
          </button>
          <button
            className="btn btn-success btn-sm"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;