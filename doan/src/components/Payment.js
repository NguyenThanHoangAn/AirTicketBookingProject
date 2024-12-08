import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerInfo } = location.state || {}; // Nhận thông tin khách hàng từ state

    // State để lưu thông tin thẻ
    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');

    // Kiểm tra xem customerInfo có tồn tại không
    if (!customerInfo) {
        return <div>Không tìm thấy thông tin khách hàng.</div>;
    }

    const flight = customerInfo.flight; // Lấy thông tin chuyến bay từ customerInfo

    // Kiểm tra xem flight có tồn tại không
    if (!flight) {
        return <div>Không tìm thấy thông tin chuyến bay.</div>;
    }

    const generateTicketCode = () => {
        return 'TK' + Math.random().toString(36).substr(2, 9).toUpperCase(); // Tạo mã vé ngẫu nhiên
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ticketCode = generateTicketCode(); // Tạo mã vé

        // Thêm mã vé vào thông tin khách hàng
        const customerInfoWithTicketCode = {
            ...customerInfo,
            ticketCode, // Thêm mã vé vào thông tin
        };

        // Gửi yêu cầu POST đến server để lưu vé
        try {
            const response = await fetch('http://localhost:5000/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MaChuyenBay: flight.flightNumber, // Thay đổi theo cấu trúc dữ liệu của bạn
                    MaVe: ticketCode,
                    TenHanhKhach: customerInfo.fullName,
                    CMND_Passport: customerInfo.cccd, // Thay đổi theo cấu trúc dữ liệu của bạn
                    Gia: flight.price,
                    SDT: customerInfo.phoneNumber,
                    email: customerInfo.email,
                }),
            });

            if (!response.ok) {
                throw new Error('Lỗi khi lưu vé');
            }

            // Chuyển hướng đến trang xác nhận
            navigate('/confirmation', { state: { customerInfo: customerInfoWithTicketCode } });
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            alert('Đã xảy ra lỗi khi xác nhận thanh toán. Vui lòng thử lại.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Thanh Toán</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Thông tin chuyến bay</h2>
                    <p><strong>Điểm đi:</strong> {flight.departure}</p>
                    <p><strong>Điểm đến:</strong> {flight.destination}</p>
                    <p><strong>Ngày đi:</strong> {flight.departureDate}</p>
                    <p><strong>Ngày về:</strong> {flight.returnDate || 'Chưa xác định'}</p>
                    <p><strong>Giá:</strong> {flight.price.toLocaleString()} VND</p>
                    <h2>Thông tin khách hàng</h2>
                    <p><strong>Họ và tên:</strong> {customerInfo.fullName}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <p><strong>Số điện thoại:</strong> {customerInfo.phoneNumber}</p>
                    <p><strong>Ngày tháng năm sinh:</strong> {customerInfo.birthday}</p>
                    <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
                </div>
                <div className="col-md-6">
                    <h2>Thông tin thanh toán</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="cardType">Loại thẻ:</label>
                            <select
                                id="cardType"
                                value={cardType}
                                onChange={(e) => setCardType(e.target.value)}
                                required
                                className="form-control"
                            >
                                <option value="">Chọn loại thẻ</option>
                                <option value="Visa">Visa</option>
                                <option value="MasterCard">MasterCard</option>
                                <option value="American Express">American Express</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Số thẻ:</label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryMonth">Tháng hết hạn:</label>
                            <input
                                type="number"
                                id="expiryMonth"
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                                min="1"
                                max="12"
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryYear">Năm hết hạn:</label>
                            <input
                                type="number"
                                id="expiryYear"
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                                min={new Date().getFullYear()}
                                required
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Xác nhận thanh toán</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
