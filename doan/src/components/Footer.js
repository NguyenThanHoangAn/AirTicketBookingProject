import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ggplay from '../images/ggplay.jpg';
import appstore from '../images/appstore.png';
import downloadapp from '../images/downloadapp.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>AIRTRIPPER</h5>
          </Col>
          <Col md={3}>
            <h6>Giới thiệu</h6>
            <ul className="list-unstyled">
              <li>Về chúng tôi</li>
              <li>Liên hệ</li>
              <li>Trợ giúp</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Sản phẩm</h6>
            <ul className="list-unstyled">
              <li>Vé máy bay</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Tải ứng dụng</h6>
            <img src={downloadapp} alt="Google Play" className="mb-2" style={{ width: '120px' }} />
            
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            {/* <h6>Đối tác thanh toán</h6>
            <img src="/path-to-payment-logo.png" alt="Payment Partners" style={{ width: '200px' }} /> */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
