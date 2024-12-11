// src/components/SearchFlightResult.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListGroup, Button, Form, Card } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import flightsData from '../data/flights.json'

const SearchFlightResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Kiểm tra xem location.state có tồn tại không, nếu không thì gán giá trị mặc định
    const { filteredFlights = [] } = location.state || {}; // Gán giá trị mặc định là mảng rỗng

    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [seatClass, setSeatClass] = useState('');
    const [searchResults, setSearchResults] = useState(filteredFlights); // State để lưu kết quả tìm kiếm

    const handleSearch = () => {
        // Logic tìm kiếm chuyến bay
        let results = flightsData.filter(flight => {
            const matchesDeparture = flight.DiemDi.toLowerCase().includes(departure.toLowerCase()) || !departure;
            const matchesDestination = flight.DiemDen.toLowerCase().includes(destination.toLowerCase()) || !destination;
            const matchesDepartureDate = flight.Ngay === departureDate || !departureDate;
            const matchesSeatClass = flight.LoaiGhe.toLowerCase() === seatClass.toLowerCase() || !seatClass;

            return matchesDeparture && matchesDestination && matchesDepartureDate && matchesSeatClass;
        });

        setSearchResults(results); // Cập nhật kết quả tìm kiếm
    };

    const handleSelectFlight = (flight) => {
        // Chuyển hướng đến trang đặt vé
        navigate('/booking', { state: { flight } });
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                
                {/* Phần tìm kiếm chuyến bay */}
                <Card className="mb-4">
                    <Card.Body>
                        <h5>Tìm kiếm chuyến bay</h5>
                        <Form>
                            <Form.Group controlId="departure">
                                <Form.Label>Nơi đi</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nhập nơi đi" 
                                    value={departure} 
                                    onChange={(e) => setDeparture(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group controlId="destination">
                                <Form.Label>Nơi đến</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nhập nơi đến" 
                                    value={destination} 
                                    onChange={(e) => setDestination(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group controlId="departureDate">
                                <Form.Label>Ngày đi</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={departureDate} 
                                    onChange={(e) => setDepartureDate(e.target.value)} 
                                />
                            </Form.Group>
                            <Form.Group className="mb-1">
                        <Form.Label>Loại ghế</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={seatClass} 
                            onChange={(e) => setSeatClass(e.target.value)} 
                        >
                            <option value="">Chọn loại ghế</option>
                            <option value="economy">Kinh tế</option>
                            <option value="business">Thương gia</option>
                            <option value="first">Hạng nhất</option>
                        </Form.Control>
                    </Form.Group>
                            <Button variant="primary" onClick={handleSearch}>
                                Tìm kiếm
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                {searchResults.length > 0 ? (
                    <ListGroup>
                        {searchResults.map((flight, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{flight.DiemDi} - {flight.DiemDen}</strong>
                                    <p>Mã chuyến bay: {flight.MaChuyenBay}</p>
                                    <p>{flight.Ngay} | {flight.LoaiGhe}</p>
                                </div>
                                <Button variant="primary" onClick={() => handleSelectFlight(flight)}>
                                    Chọn vé
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>Không tìm thấy chuyến bay nào.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchFlightResult;