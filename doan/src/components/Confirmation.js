// src/components/Confirmation.js
import React from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import { Button } from 'react-bootstrap';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerInfo } = location.state;

  const handleGoHome = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

  return (
    <div>
      <Header /> 
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card p-4" style={{ width: '100%', maxWidth: '600px' }}>
          <h1 className="text-center">Xác nhận đặt vé thành công!</h1>
          <h2>Thông tin chuyến bay</h2>
          <p><strong>Mã vé:</strong> {customerInfo.ticketCode}</p>
          <p><strong>Điểm đi:</strong> {customerInfo.flight.DiemDi}</p>
          <p><strong>Điểm đến:</strong> {customerInfo.flight.DiemDen}</p>
          <p><strong>Ngày đi:</strong> {customerInfo.flight.Ngay}</p>
          <p><strong>Giá:</strong> {customerInfo.flight.Gia.toLocaleString()} VND</p>

          <h2>Thông tin khách hàng</h2>
          <p><strong>Họ và tên:</strong> {customerInfo.fullName}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Số điện thoại:</strong> {customerInfo.phoneNumber}</p>
          <p><strong>Ngày tháng năm sinh:</strong> {customerInfo.birthday}</p>
          <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
        </div>
      </div>
      <br/>
      <Button variant='primary' onClick={handleGoHome} >
        Quay về trang chủ
      </Button>
      <br/>
      <Footer />
    </div>
  );
};

export default Confirmation;