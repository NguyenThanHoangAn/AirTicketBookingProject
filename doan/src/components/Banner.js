// src/components/Banner.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import flightImage1 from '../images/banner1.jpg'; 
import flightImage2 from '../images/banner2.jpg';
import flightImage3 from '../images/banner3.jpg';

const Banner = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={flightImage1}
                    alt="First slide"
                    style={{ height: '500px', objectFit: 'cover', filter: 'brightness(0.9)' }} // Điều chỉnh độ sáng
                />
                <Carousel.Caption>
                    <h3>Chào mừng đến với AirTripper</h3>
                    <p>Đặt vé máy bay dễ dàng và nhanh chóng.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={flightImage2}
                    alt="Second slide"
                    style={{ height: '500px', objectFit: 'cover', filter: 'brightness(0.9)' }} // Điều chỉnh độ sáng
                />
                <Carousel.Caption>
                    <h3>Khám phá những điểm đến tuyệt vời</h3>
                    <p>Chúng tôi cung cấp các chuyến bay đến nhiều địa điểm hấp dẫn.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={flightImage3}
                    alt="Third slide"
                    style={{ height: '500px', objectFit: 'cover', filter: 'brightness(0.9)' }} // Điều chỉnh độ sáng
                />
                <Carousel.Caption>
                    <h3>Ưu đãi đặc biệt cho bạn</h3>
                    <p>Đặt vé ngay hôm nay để nhận ưu đãi tốt nhất!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;