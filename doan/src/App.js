// e:\AirTicketBookingProject\doan\src\App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';


const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                
                {/* Thêm các route khác nếu cần */}
            </Routes>
            <Footer />
        </>
    );
};

export default App;