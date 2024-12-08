import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Header from "./Header";
import Footer from "./Footer";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = location.state; // Nhận thông tin chuyến bay từ state

  const handleConfirmBooking = () => {
    // Chuyển hướng đến trang nhập thông tin khách hàng
    navigate('/customer-info', { state: { flight } });
  };

  return (
    <div>
      <Header/>
    <div className="container mt-5">
      <h1>Xác nhận đặt vé</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Thông tin chuyến bay</Card.Title>
          <Card.Text>
            <strong>Điểm đi:</strong> {flight.departure}<br />
            <strong>Điểm đến:</strong> {flight.destination}<br />
            <strong>Ngày đi:</strong> {flight.departureDate}<br />
            <strong>Ngày về:</strong> {flight.returnDate}<br />
            <strong>Loại ghế:</strong> {flight.seatClass}<br />
            <strong>Giá:</strong> {flight.price.toLocaleString()} VND
          </Card.Text>
        </Card.Body>
      </Card>

      <Button variant="primary" onClick={handleConfirmBooking}>
        Xác nhận đặt vé
      </Button>
      <p/>
    </div>
    <Footer/>
    </div>
  );
};

export default BookingPage;