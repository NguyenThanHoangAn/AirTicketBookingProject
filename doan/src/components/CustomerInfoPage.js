import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Khởi tạo state cho thông tin khách hàng
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');

  // Kiểm tra xem location.state có tồn tại không
  const { flight } = location.state || {}; // Nếu không có state, flight sẽ là undefined

  // Nếu flight không tồn tại, điều hướng về trang trước đó hoặc hiển thị thông báo
  if (!flight) {
    return (
      <div className="container mt-5">
        <h1>Thông tin chuyến bay không có sẵn.</h1>
        <Button onClick={() => navigate('/')}>Quay lại trang chính</Button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerInfo = {
      fullName,
      email,
      phoneNumber,
      birthday,
      address,
      flight,
    };

    // Chuyển hướng đến trang chọn ghế
    navigate('/seat-selection', { state: { customerInfo } });
  };

  return (
    <div className="container mt-5">
      <h1>Nhập thông tin khách hàng</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ngày tháng năm sinh</Form.Label>
          <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Xác nhận đặt vé</Button>
      </Form>
    </div>
  );
};

export default CustomerInfoPage;