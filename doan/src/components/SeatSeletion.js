// e:\AirTicketBookingProject\doan\src\components\SeatSelection.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './SeatSelection.css'; // Import CSS cho sơ đồ ghế

const SeatSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [luggageQuantity, setLuggageQuantity] = useState(0);

  // Danh sách ghế mẫu
  const seats = [
    { id: '1A', available: true },
    { id: '1B', available: true },
    { id: '1C', available: false }, // Ghế không khả dụng
    { id: '2A', available: true },
    { id: '2B', available: true },
    { id: '2C', available: true },
    { id: '3A', available: true },
    { id: '3B', available: true },
    { id: '3C', available: true },
  ];

  const { customerInfo } = location.state || {}; // Nhận thông tin khách hàng từ state

  // Kiểm tra xem customerInfo có tồn tại không
  if (!customerInfo) {
    return (
      <div className="container mt-5">
        <h1>Thông tin khách hàng không có sẵn.</h1>
        <Button onClick={() => navigate('/')}>Quay lại trang chính</Button>
      </div>
    );
  }
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat)); // Bỏ chọn ghế
    } else {
      setSelectedSeats([...selectedSeats, seat]); // Chọn ghế
    }
  };

  const handleConfirmSelection = () => {
    // Chuyển hướng đến trang xác nhận với thông tin đã chọn
    navigate('/confirmation', { state: { customerInfo, selectedSeats, luggageQuantity } });
  };

  return (
    <div className="container mt-5">
      <h1>Chọn ghế ngồi</h1>
      <div className="seat-map">
        {seats.map(seat => (
          <div
            key={seat.id}
            className={`seat ${seat.available ? 'available' : 'unavailable'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
            onClick={() => seat.available && handleSeatSelection(seat.id)}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <div className="luggage-section">
        <label>Khối lượng hành lý (kg):</label>
        <input
          type="number"
          value={luggageQuantity}
          onChange={(e) => setLuggageQuantity(e.target.value)}
          min="0"
        />
      </div>
      <Button variant="primary" onClick={handleConfirmSelection}>
        Xác nhận
      </Button>
    </div>
  );
};

export default SeatSelectionPage;