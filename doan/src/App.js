// e:\AirTicketBookingProject\doan\src\App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import BookingPage from './components/BookingPage';
import CustomerInfoPage from './components/CustomerInfoPage';
import Confirmation from './components/Confirmation';
import SeatSelectionPage from './components/SeatSeletion';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/customer-info" element={<CustomerInfoPage />} />
                <Route path="/seat-selection" element={<SeatSelectionPage />} /> 
                <Route path="/confirmation" element={<Confirmation />} />
                {/* Thêm các route khác nếu cần */}
            </Routes>
            <Footer />
        </>
    );
};

export default App;