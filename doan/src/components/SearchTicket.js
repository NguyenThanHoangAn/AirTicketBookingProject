import React, { useState } from "react";
import { Card, Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Thêm import này
import flightsData from '../data/flights.json';

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
            const matchesDeparture = flight.departure.toLowerCase().includes(departure.toLowerCase()) || !departure;
            const matchesDestination = flight.destination.toLowerCase().includes(destination.toLowerCase()) || !destination;
            const matchesDepartureDate = flight.departureDate === departureDate || !departureDate;
            const matchesReturnDate = tripType === 'round_trip'
                ? (flight.returnDate === returnDate || !returnDate)
                : true;
            const matchesSeatClass = flight.seatClass === seatClass || !seatClass;

            return matchesDeparture && matchesDestination && matchesDepartureDate && matchesReturnDate && matchesSeatClass;
        });

        setFilteredFlights(results);
    };

    const handleSelectFlight = (flight) => {
        navigate('/booking', { state: { flight } }); // Chuyển hướng đến trang đặt vé
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
                            <Form .Group controlId="formDeparture">
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
                    <Form.Group controlId="formSeatClass" className="mb-1">
                        <Form.Label>Loại ghế</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={seatClass} 
                            onChange={(e) => setSeatClass(e.target.value)} 
                        >
                            <option value="">Chọn loại ghế</option>
                            <option value="economy">Economy</option>
                            <option value="business">Business</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Nút tìm kiếm */}
                    <Button variant="primary" onClick={handleSearch}>
                        Tìm vé
                    </Button>
                </Form>
            </Card.Body>

            {/* Hiển thị kết quả tìm kiếm */}
            {filteredFlights.length > 0 && (
                <ListGroup className="mt-3">
                    {filteredFlights.map((flight) => (
                        <ListGroup.Item key={flight.id} className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{flight.departure} → {flight.destination}</strong><br />
                                Ngày: {flight.departureDate} | Giá: {flight.price.toLocaleString()} VND
                            </div>
                            <Button variant="success" onClick={() => handleSelectFlight(flight)}>
                                Chọn vé
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Card>
    );
    
};

export default FlightSearchForm;