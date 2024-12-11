import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './Seat.css';
import Header from './Header';
import Footer from './Footer';

const SeatSelection = () => {
    const location = useLocation();
    const { flightNumber } = useParams();
    const [bookedSeats, setBookedSeats] = useState([]); // Danh sách ghế đã đặt
    const [tickets, setTickets] = useState([]);
    const { customerInfo, flight } = location.state || {};
    const [selectedSeats, setSelectedSeats] = useState([]); // Danh sách ghế đã chọn
    const navigate = useNavigate();

    // Lấy danh sách ghế đã đặt từ server
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tickets/${flightNumber}`);
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu vé');
                }
                const data = await response.json();
                setTickets(data); // Lưu danh sách vé vào state

                // Lấy danh sách ghế đã đặt từ các vé
                const allBookedSeats = data.flatMap(ticket => ticket.selectedSeats.split('|'));
                setBookedSeats(allBookedSeats); // Lưu ghế đã đặt vào state

                console.log('Ghế đã đặt:', allBookedSeats);
            } catch (error) {
                console.error('Lỗi khi lấy vé:', error);
            }
        };

        fetchTickets();
    }, [flightNumber]); // Chạy lại khi flightNumber thay đổi


    const seats = Array.from({ length: 10 }, (_, rowIndex) => {
        return ['A', 'B', 'C', 'D', 'E', 'F'].map(column => `${column}${rowIndex + 1}`);
    });

    const handleSeatSelect = (seat) => {
        // Kiểm tra xem ghế đã được đặt chưa
        if (bookedSeats.includes(seat)) {
            alert('Ghế này đã được đặt, vui lòng chọn ghế khác.');
            return;
        }
    
        // Thêm hoặc xóa ghế khỏi danh sách đã chọn
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleConfirmSeats = () => {
    const updatedTickets = { selectedSeats: selectedSeats.join('|') }; // Sử dụng biến mới
    navigate('/payment', { state: { selectedSeats, customerInfo, flight, tickets: updatedTickets } });
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
                                    {row.map((seat, index) => (
                                        <Col key={seat} md={1} className={`mb-2 text-center ${bookedSeats.includes(seat) ? 'booked' : ''} ${index === 2 ? 'seat-gap' : ''}`}>
                                            <div className={`seat ${bookedSeats.includes(seat) ? 'booked' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`} onClick={() => handleSeatSelect(seat)}>
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
                                <Card.Text>
                                    <strong>Họ tên:</strong> {`${customerInfo.fullName}`}<br />
                                    <strong>CCCD:</strong> {customerInfo.cccd}<br/>
                                    <strong>Mã chuyến bay:</strong> {flight.MaChuyenBay}<br />
                                    <strong>Điểm đi:</strong> {flight.DiemDi}<br />
                                    <strong>Điểm đến:</strong> {flight.DiemDen}<br />
                                    <strong>Ngày đi:</strong> {flight.Ngay}<br />
                                    <strong>Giá:</strong> {flight.Gia.toLocaleString()} VND
                                </Card.Text>
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
