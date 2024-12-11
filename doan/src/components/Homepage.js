// src/components/Homepage.js
import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Banner from './Banner'; // Import component Banner
import flights from '../data/flightData';
import promotions from '../data/promotionsData';
import BookingSection from './SearchTicket';

const Homepage = () => {
    return (
        <main>
            <Banner /> {/* Thêm Banner ở đây */}
            <BookingSection/>
            <Container className="py-5">
                {/* Promotions Section */}
                <section className="mb-5">
                    <div className="border-bottom border-primary mb-4">
                        <h2 className="h4 font-weight-bold">Ưu đãi</h2>
                    </div>
                    <Row>
                        {promotions.map((promo) => (
                            <Col key={promo.id} md={4} sm={6} className="mb-4">
                                <Card className="h-100 shadow-sm">
                                    <Card.Img variant="top" src={promo.image} alt={promo.title} />
                                    <Card.Body className="d-flex flex-column text-center">
                                        <Card.Title>{promo.title}</Card.Title>
                                        <Card.Text>{promo.description}</Card.Text>
                                        <Button variant={promo.buttonVariant}>{promo.buttonText}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Flights Section */}
                <section className="mb-5">
                    <div className="border-bottom mb-4">
                        <h2 className="h4 font-weight-bold">Các chuyến bay</h2>
                    </div>
                    <Row>
                        {flights.map((flight) => (
                            <Col key={flight.id} md={4} sm={6} className="mb-4">
                                <Card className="h-100 shadow-sm">
                                    <Card.Img variant="top" src={flight.image} alt={flight.route} />
                                    <Card.Body className="d-flex flex-column">
                                        <div className="mb-2 d-flex justify-content-between align-items-center">
                                            <Badge bg="secondary" className="me-2">{flight.badge}</Badge>
                                            <small className="text-muted">Last view: {flight.lastView}</small>
                                        </div>
                                        <Card.Title className="small-font">{flight.route}</Card.Title>
                                        <Card.Text className="text-muted small mb-2">
                                            Ngày: {flight.date}
                                        </Card.Text>
                                        <Card.Text className="text-muted small mb-3">
                                            Giá từ: VNĐ
                                        </Card.Text>
                                        <h5 className="text-danger font-weight-bold mb-4">{flight.price}</h5>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                        <Link to="/passenger-details">
                                            <Button variant="outline-primary" className="small-font">
                                                Xem chi tiết <i className="fas fa-arrow-right ms-2"></i>
                                            </Button>
                                        </Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>
            </Container>
        </main>
    );
};

export default Homepage;