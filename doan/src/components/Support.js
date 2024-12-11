// src/components/Support.js
import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const Support = () => {
    return (
        <div>
            <Header />
            <Container className="mt-5">
                <h1>Hỗ trợ</h1>
                <p>Trang này đang được cập nhật. Vui lòng quay lại sau.</p>
            </Container>
            <Footer />
        </div>
    );
};

export default Support;