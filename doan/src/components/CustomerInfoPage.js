import React, { useState } from 'react';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const CustomerInfoPage = () => {
  const location = useLocation();
  const { flight } = location.state; // Nhận thông tin chuyến bay từ state

  // Khai báo state quản lý dữ liệu nhập
  const [formData, setFormData] = useState({
    lastName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    address: '',
    cccd: '', // Thêm CCCD
  });

  const navigate = useNavigate();

  // Xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    

    const customerInfo = {
      ...formData,
      fullName: `${formData.lastName} ${formData.fullName}`, // Họ + tên
      flight,
    };

    // Điều hướng đến trang thanh toán
    navigate('/seat', { state: { customerInfo } });
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>Nhập thông tin khách hàng</h2>
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Họ</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Tên đệm và tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>CCCD</Form.Label>
                <Form.Control
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>
                Tiếp tục
              </Button>
            </Form>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Thông tin chuyến bay</Card.Title>
                <Card.Text>
                  <strong>Họ tên:</strong> {`${formData.lastName} ${formData.fullName}`}<br />
                  <strong>CCCD:</strong> {formData.cccd}<br />
                  <strong>Điểm đi:</strong> {flight.departure}<br />
                  <strong>Điểm đến:</strong> {flight.destination}<br />
                  <strong>Ngày đi:</strong> {flight.departureDate}<br />
                  <strong>Ngày về:</strong> {flight.returnDate}<br />
                  <strong>Giá:</strong> {flight.price.toLocaleString()} VND<br />
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

export default CustomerInfoPage;
