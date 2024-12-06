import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { customerInfo } = location.state;

  return (
    <div className="container mt-5">
      <h1>Xác nhận đặt vé thành công!</h1>
      <h2>Thông tin chuyến bay</h2>
      <p><strong>Điểm đi:</strong> {customerInfo.flight.departure}</p>
      <p><strong>Điểm đến:</strong> {customerInfo.flight.destination}</p>
      <p><strong>Ngày đi:</strong> {customerInfo.flight.departureDate}</p>
      <p><strong>Giá:</strong> {customerInfo.flight.price.toLocaleString()} VND</p>

      <h2>Thông tin khách hàng</h2>
      <p><strong>Họ và tên:</strong> {customerInfo.fullName}</p>
      <p><strong>Email:</strong> {customerInfo.email}</p>
      <p><strong>Số điện thoại:</strong> {customerInfo.phoneNumber}</p>
      <p><strong>Ngày tháng năm sinh:</strong> {customerInfo.birthday}</p>
      <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
    </div>
  );
};

export default Confirmation;