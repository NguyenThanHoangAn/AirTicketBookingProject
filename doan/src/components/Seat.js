import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './Seat.css';
import Header from './Header';
import Footer from './Footer';

const SeatSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookedSeats, setBookedSeats] = useState([]); // Danh sách ghế đã đặt
    const [selectedSeats, setSelectedSeats] = useState([]); // Danh sách ghế đã chọn

    // Lấy thông tin chuyến bay từ location.state
    const flight = location.state?.flight; // Sử dụng optional chaining để tránh lỗi nếu flight không tồn tại

    // Lấy danh sách ghế đã đặt từ server
    useEffect(() => {
        const fetchBookedSeats = async () => {
            if (!flight) return; // Nếu không có thông tin chuyến bay, không làm gì cả

            try {
                const response = await fetch(`http://localhost:5000/tickets/soghe/${flight.MaChuyenBay}`);
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu vé');
                }
                const data = await response.json();
                setBookedSeats(data.seats); // Lưu ghế đã đặt vào state
            } catch (error) {
                console.error('Lỗi khi lấy vé:', error);
            }
        };

        fetchBookedSeats();
    }, [flight]);

    const seats = Array.from({ length: 10 }, (_, rowIndex) => {
        return ['A', 'B', 'C', 'D', 'E', 'F'].map(column => `${column}${rowIndex + 1}`);
    });

    const handleSeatSelect = (seat) => {
        // Kiểm tra xem ghế đã được đặt chưa
        if (bookedSeats.includes(seat)) {
            alert('Ghế này đã được đặt, vui lòng chọn ghế khác.');
            return; // Không thực hiện hành động gì nếu ghế đã đặt
        }
    
        // Nếu ghế đã được chọn, xóa nó khỏi danh sách đã chọn
        if (selectedSeats.includes(seat)) {
            setSelectedSeats([]); // Xóa ghế đã chọn
        } else {
            setSelectedSeats([seat]); // Chọn ghế mới và xóa ghế cũ
        }
    };

    const handleConfirmSeats = () => {
        if (selectedSeats.length > 0) {
            // Chuyển hướng đến trang thanh toán với thông tin ghế đã chọn
            navigate('/payment', { state: { customerInfo: location.state.customerInfo, flight, tickets: { selectedSeats } } });
        } else {
            alert('Vui lòng chọn ít nhất một ghế.');
        }
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1>Chọn ghế ngồi</h1>
                <Row>
                    <Col md={8}>
                        <div className="seat-chart"> 
                            {seats.map((row, rowIndex) => (
                                <Row key={rowIndex} className="mb-2">
                                    {row.map((seat) => (
                                        <Col key={seat} md={1} className="mb-2 text-center">
                                            <div 
                                                className={`seat ${bookedSeats.includes(seat) ? 'booked' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`} 
                                                onClick={() => handleSeatSelect(seat)}
                                            >
                                               {seat}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </div>
                        <Button variant="primary" disabled={selectedSeats.length === 0} onClick={handleConfirmSeats}>
                            Xác nhận chọn ghế
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Thông tin chuyến bay</Card.Title>
                                {flight ? ( // Kiểm tra xem flight có tồn tại không
                                    <Card.Text>
                                        <strong>Mã chuyến bay:</strong> {flight.MaChuyenBay}<br />
                                        <strong>Điểm đi:</strong> {flight.DiemDi}<br />
                                        <strong>Điểm đến:</strong> {flight.DiemDen}<br />
                                        <strong>Ngày đi:</strong> {flight.Ngay}<br />
                                        <strong>Giá:</strong> {flight.Gia.toLocaleString()} VND
                                    </Card.Text>
                                ) : (
                                    <Card.Text>Thông tin chuyến bay không có sẵn.</Card.Text>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
};

export default SeatSelection;