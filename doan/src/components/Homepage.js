import React from 'react';
import { Tab, Tabs, Container, Row, Col, Card, Form, Button, Carousel, Badge } from 'react-bootstrap';
import background from '../images/halongbay.jpg';
import flights from '../data/flightData';
import promotions from '../data/promotionsData';

const Homepage = () => {
    return (
        <main>
            <section className="position-relative">
                <img 
                    src={background} 
                    alt="Paris cityscape with Eiffel Tower" 
                    className="img-fluid w-100" 
                />
                <div 
                    className="position-absolute bottom-0 start-50 translate-middle-x bg-white shadow-lg rounded-top w-100" 
                    style={{ maxWidth: '1000px', padding: '10px', fontSize: '0.9rem' }}
                >
                    <Tabs defaultActiveKey="mua-ve" id="homepage-tabs" className="mb-2">
                        <Tab eventKey="mua-ve" title="Mua vé">
                            <Card className="small-card">
                                <Card.Body>
                                    <Card.Title className="h5 font-weight-bold mb-3">Nhập thông tin địa điểm, ngày</Card.Title>
                                    <Form>
                                        <Form.Group as={Row} className="mb-2">
                                            <Form.Label as="legend" column sm={3}>
                                                Loại chuyến
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Check 
                                                    type="radio" 
                                                    label="Một chiều" 
                                                    name="trip_type" 
                                                    id="one_way" 
                                                    defaultChecked
                                                    className="me-2"
                                                />
                                                <Form.Check 
                                                    type="radio" 
                                                    label="Khứ hồi" 
                                                    name="trip_type" 
                                                    id="round_trip" 
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Row>
                                            <Col md={6} className="mb-2">
                                                <Form.Label htmlFor="departure">Điểm đi</Form.Label>
                                                <Form.Select id="departure" aria-label="Điểm đi">
                                                    <option>Chọn điểm đi</option>
                                                    <option value="1">Hà Nội</option>
                                                    <option value="2">Hồ Chí Minh</option>
                                                </Form.Select>
                                            </Col>
                                            <Col md={6} className="mb-2">
                                                <Form.Label htmlFor="destination">Điểm đến</Form.Label>
                                                <Form.Select id="destination" aria-label="Điểm đến">
                                                    <option>Chọn điểm đến</option>
                                                    <option value="1">Đà Nẵng</option>
                                                    <option value="2">Cần Thơ</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6} className="mb-2">
                                                <Form.Label htmlFor="departure_date">Ngày đi</Form.Label>
                                                <Form.Control type="date" id="departure_date" />
                                            </Col>
                                            <Col md={6} className="mb-2">
                                                <Form.Label htmlFor="return_date">Ngày về</Form.Label>
                                                <Form.Control type="date" id="return_date" />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6} className="mb-2">
                                                <Form.Label htmlFor="seat_class">Loại ghế</Form.Label>
                                                <Form.Select id="seat_class" aria-label="Loại ghế">
                                                    <option>Chọn loại ghế</option>
                                                    <option value="economy">Economy</option>
                                                    <option value="business">Business</option>
                                                    <option value="first">First Class</option>
                                                </Form.Select>
                                            </Col>
                                            <Col md={6} className="d-flex align-items-end">
                                                <Button variant="primary" className="w-100">Tìm vé</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="lam-thu-tuc" title="Làm thủ tục">
                            <Card className="small-card">
                                <Card.Body>
                                    <Card.Title className="h5 font-weight-bold mb-3">Làm thủ tục</Card.Title>
                                    <p>Thông tin về làm thủ tục sẽ được cập nhật sớm.</p>
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="quan-ly-dat-cho" title="Quản lý đặt chỗ">
                            <Card className="small-card">
                                <Card.Body>
                                    <Card.Title className="h5 font-weight-bold mb-3">Quản lý đặt chỗ</Card.Title>
                                    <p>Thông tin về quản lý đặt chỗ sẽ được cập nhật sớm.</p>
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </section>

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
                                        <Button variant="outline-primary" className="mt-auto align-self-start small-font">
                                            Xem chi tiết <i className="fas fa-arrow-right ms-2"></i>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center">
                        <Button variant="success">Xem thêm</Button>
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default Homepage;
