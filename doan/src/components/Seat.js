// src/components/Seat.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './Seat.css';

const Seat = () => {
    const location = useLocation();
    const { customerInfo } = location.state; // Nhận thông tin khách hàng từ state
    const flight = customerInfo.flight; // Lấy thông tin chuyến bay từ customerInfo
    const navigate = useNavigate();

    // State để lưu ghế đã chọn
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Kiểm tra xem flight có tồn tại không
    if (!flight) {
        return <div>Không tìm thấy thông tin chuyến bay.</div>;
    }

    // Danh sách ghế (có thể thay đổi theo yêu cầu)
    const seats = Array.from({ length: 30 }, (_, index) => `A${index + 1}`);

    const handleSeatSelect = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat)); // Bỏ chọn ghế
        } else {
            setSelectedSeats([...selectedSeats, seat]); // Chọn ghế
        }
    };

    const handleConfirmSeats = () => {
        // Chuyển hướng đến trang thanh toán với thông tin ghế đã chọn
        navigate('/payment', { state: { flight, selectedSeats, customerInfo } });
    };

    return (
        <div className="container mt-5">
            <h1>Chọn ghế ngồi</h1>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Thông tin chuyến bay</Card.Title>
                    <Card.Text>
                        <strong>Điểm đi:</strong> {flight.departure}<br />
                        <strong>Điểm đến:</strong> {flight.destination}<br />
                        <strong>Ngày đi:</strong> {flight.departureDate}<br />
                        <strong>Giá:</strong> {flight.price.toLocaleString()} VND
                    </Card.Text>
                </Card.Body>
            </Card>

            <h2>Chọn ghế</h2>
            <Row>
                {seats.map(seat => (
                    <Col key={seat} md={2} className="mb-2">
                        <Button
                            variant={selectedSeats.includes(seat) ? 'success' : 'secondary'}
                            onClick={() => handleSeatSelect(seat)}
                            className="seat-button"
                        >
                            {seat}
                        </Button>
                    </Col>
                ))}
            </Row>

            <Button variant="primary" onClick={handleConfirmSeats} disabled={selectedSeats.length === 0}>
                Xác nhận chọn ghế
            </Button>
        </div>
    );
};

export default Seat;