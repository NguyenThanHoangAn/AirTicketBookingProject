import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer

const FlightInfo = () => {
    const [ticketCode, setTicketCode] = useState('');
    const [flightInfo, setFlightInfo] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setFlightInfo(null);

        try {
            const response = await fetch(`http://localhost:5000/tickets/${ticketCode}`);
            if (!response.ok) {
                throw new Error('Không tìm thấy thông tin chuyến bay với mã vé này.');
            }
            const data = await response.json();
            setFlightInfo(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100"> {/* Thêm class để sử dụng flexbox */}
            <Header /> {/* Thêm Header */}
            <div className="container mt-5 flex-grow-1"> {/* Thêm class flex-grow-1 để nội dung chiếm không gian còn lại */}
                <h1>Tìm thông tin chuyến bay</h1>
                <Form onSubmit={handleSearch}>
                    <Form.Group controlId="ticketCode">
                        <Form.Label>Mã vé</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập mã vé"
                            value={ticketCode}
                            onChange={(e) => setTicketCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Tìm kiếm
                    </Button>
                </Form>

                {error && <div className="alert alert-danger mt-3">{error}</div>}

                {flightInfo && (
                    <Card className="mt-4">
                        <Card.Body>
                            <Card.Title>Thông tin chuyến bay</Card.Title>
                            <Card.Text>
                                <strong>Mã vé:</strong> {flightInfo.MaVe}<br />
                                <strong>Tên hành khách:</strong> {flightInfo.TenHanhKhach}<br />
                                <strong>Mã chuyến bay:</strong> {flightInfo.MaChuyenBay}<br />
                                <strong>Giá:</strong> {flightInfo.Gia} VND<br />
                                <strong>Số điện thoại:</strong> {flightInfo.SDT}<br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </div>
            <Footer /> {/* Thêm Footer */}
        </div>
    );
};

export default FlightInfo;