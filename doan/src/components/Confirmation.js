// src/components/Confirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 

const Confirmation = () => {
  const location = useLocation();
  const { customerInfo } = location.state;

  return (
    <div>
      <Header /> 
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card p-4" style={{ width: '100%', maxWidth: '600px' }}>
          <h1 className="text-center">Xác nhận đặt vé thành công!</h1>
          <h2>Thông tin chuyến bay</h2>
          <p><strong>Mã vé:</strong> {customerInfo.ticketCode}</p>
          <p><strong>Điểm đi:</strong> {customerInfo.flight.departure}</p>
          <p><strong>Điểm đến:</strong> {customerInfo.flight.destination}</p>
          <p><strong>Ngày đi:</strong> {customerInfo.flight.departureDate}</p>
          <p><strong>Ngày về:</strong> {customerInfo.flight.returnDate}<br /></p>
          <p><strong>Giá:</strong> {customerInfo.flight.price.toLocaleString()} VND</p>

          <h2>Thông tin khách hàng</h2>
          <p><strong>Họ và tên:</strong> {customerInfo.fullName}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Số điện thoại:</strong> {customerInfo.phoneNumber}</p>
          <p><strong>Ngày tháng năm sinh:</strong> {customerInfo.birthday}</p>
          <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
        </div>
      </div>
      <br/>
      <Footer />
    </div>
  );
};

export default Confirmation;