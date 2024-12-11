// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Loading from 'react-loading'; // Import react-loading
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Thay đổi thời gian tùy ý

        return () => clearTimeout(timer); // Dọn dẹp timer
    }, [location]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="flex-grow-1">
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Loading type="spin" color="#007bff" />
                    </div>
                ) : (
                    <Routes location={location} key={location.key}>
                        <Route path="/" element={<Homepage />} />
                    </Routes>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default App;