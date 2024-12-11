import React, { useState } from "react";
import { Card, Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Thêm import này
import flightsData from '../data/flights.json'; // Sử dụng flights.json

const FlightSearchForm = () => {
    
    const [tripType, setTripType] = useState('one_way');
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [seatClass, setSeatClass] = useState('');
    const [filteredFlights, setFilteredFlights] = useState([]);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleSearch = () => {
        let results = flightsData.filter(flight => {
            const matchesDeparture = flight.DiemDi.toLowerCase().includes(departure.toLowerCase()) || !departure;
            const matchesDestination = flight.DiemDen.toLowerCase().includes(destination.toLowerCase()) || !destination;
            const matchesDepartureDate = flight.Ngay === departureDate || !departureDate;
            const matchesSeatClass = flight.LoaiGhe.toLowerCase() === seatClass.toLowerCase() || !seatClass;

            return matchesDeparture && matchesDestination && matchesDepartureDate && matchesSeatClass;
        });

        // Chuyển hướng đến trang kết quả tìm kiếm
        navigate('/search-flight-result', { state: { filteredFlights: results } });
    };

    const handleSelectFlight = (flight) => {
        // Chuyển hướng đến trang đặt vé hoặc trang khác nếu cần
        navigate('/booking', { state: { flight } });
    };
    
    return (
        <Card className="small-card shadow-sm" style={{ maxWidth: '80%', height: 'auto', margin: '0 auto' }}>
            <Card.Body>
                <Card.Title className="h5 font-weight-bold mb-1">Nhập thông tin địa điểm, ngày</Card.Title>
                <Form>
                    {/* Phần Loại chuyến */}
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label as="legend" column sm={3}>Loại chuyến</Form.Label>
                        <Col sm={9}>
                            <Form.Check
                                type="radio"
                                label="Một chiều"
                                name="trip_type"
                                id="one_way"
                                defaultChecked
                                onChange={() => setTripType('one_way')}
                                className="me-2"
                            />
                            <Form.Check
                                type="radio"
                                label="Khứ hồi"
                                name="trip_type"
                                id="round_trip"
                                onChange={() => setTripType('round_trip')}
                            />
                        </Col>
                    </Form.Group>

                    {/* Phần nhập điểm đi và điểm đến */}
                    <Row className="mb-1">
                        <Col md={6} className="mb-1">
                            <Form.Group controlId="formDeparture">
                                <Form.Label>Điểm đi</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nhập điểm đi" 
                                    value={departure} 
                                    onChange={(e) => setDeparture(e.target.value)} 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-1">
                            <Form.Group controlId="formDestination">
                                <Form.Label>Điểm đến</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nhập điểm đến" 
                                    value={destination} 
                                    onChange={(e) => setDestination(e.target.value)} 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Phần nhập ngày đi và ngày về */}
                    <Row className="mb-1">
                        <Col md={6} className="mb-1">
                            <Form.Group controlId="formDepartureDate">
                                <Form.Label>Ngày đi</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={departureDate} 
                                    onChange={(e) => setDepartureDate(e.target.value)} 
                                />
                            </Form.Group>
                        </Col>
                        {tripType === 'round_trip' && (
                            <Col md={6} className="mb-1">
                                <Form.Group controlId="formReturnDate">
                                    <Form.Label>Ngày về</Form.Label>
                                    <Form.Control 
                                        type="date" 
                                        value={returnDate} 
                                        onChange={(e) => setReturnDate(e.target.value)} 
                                    />
                                </Form.Group>
                            </Col>
                        )}
                    </Row>

                    {/* Phần chọn loại ghế */}
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

                    {/* Nút tìm kiếm */}
                    <Button variant="primary" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </Form>

                {/* Hiển thị kết quả tìm kiếm */}
                {filteredFlights.length > 0 && (
                    <ListGroup className="mt-3">
                    {filteredFlights.map((flight, index) => (
                        <ListGroup.Item key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{flight.DiemDi} - {flight.DiemDen}</strong>
                                    <p>{flight.Ngay} | {flight.LoaiGhe}</p>
                                    <p><strong>Mã chuyến bay:</strong> {flight.MaChuyenBay}</p>
                                </div>
                                <Button variant="primary" onClick={() => handleSelectFlight(flight)}>
                                    Chọn vé
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
};

export default FlightSearchForm;