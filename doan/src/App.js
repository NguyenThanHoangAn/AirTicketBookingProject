// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Support from './components/Support'; // Import trang hỗ trợ
import './App.css'; // Import file CSS cho App

const App = () => {
    return (
        <div className="d-flex flex-column min-vh-100"> {/* Sử dụng Flexbox để đảm bảo Footer ở cuối */}
            <Header />
            <div className="flex-grow-1"> {/* Nội dung sẽ chiếm không gian còn lại */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;