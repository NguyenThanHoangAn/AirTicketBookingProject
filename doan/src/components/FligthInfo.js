import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import './FlightInfo.css';

const FlightInfo = () => {
    const [ticketCode, setTicketCode] = useState('');
    const [flightInfo, setFlightInfo] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError(''); // Reset error message
        setFlightInfo(null); // Reset flight info

        try {
            const response = await fetch(`http://localhost:5000/tickets/${ticketCode}`);
            if (!response.ok) {
                throw new Error('Không tìm thấy vé với mã này.');
            }
            const data = await response.json();
            setFlightInfo(data); // Set the flight info directly from the response
        } catch (err) {
            setError(err.message); // Set error message
        }
    };
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
        <div className="container mt-4">
            <h2>Tra cứu thông tin chuyến bay</h2>
            <Form inline className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Nhập mã vé"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </Form>

            {error && <div className="alert alert-danger">{error}</div>}

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
        <Footer/>
        </div>
    );
    
};

export default FlightInfo;