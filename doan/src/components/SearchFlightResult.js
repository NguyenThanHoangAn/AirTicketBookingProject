import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListGroup, Button, Card } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import flightsData from '../data/flights.json'

const SearchFlightResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Kiểm tra xem location.state có tồn tại không, nếu không thì gán giá trị mặc định
    const { filteredFlights = [] } = location.state || {}; // Gán giá trị mặc định là mảng rỗng

    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [seatClass, setSeatClass] = useState('');
    const [searchResults, setSearchResults] = useState(filteredFlights); // State để lưu kết quả tìm kiếm

    const handleSearch = () => {
        // Logic tìm kiếm chuyến bay
        const results = filteredFlights.filter(flight => {
            const matchesDeparture = flight.DiemDi.toLowerCase().includes(departure.toLowerCase()) || !departure;
            const matchesDestination = flight.DiemDen.toLowerCase().includes(destination.toLowerCase()) || !destination;
            const matchesDepartureDate = flight.Ngay === departureDate || !departureDate;
            const matchesSeatClass = flight.LoaiGhe.toLowerCase() === seatClass.toLowerCase() || !seatClass;
            return matchesDeparture && matchesDestination && matchesDepartureDate && matchesSeatClass;
        });

        setSearchResults(results); // Cập nhật kết quả tìm kiếm
    };

    const handleSelectFlight = (flight) => {
        // Navigate to the booking page with the selected flight
        navigate('/booking', { state: { flight } });
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h3>Kết quả tìm kiếm chuyến bay</h3>

                {/* Display Search Results */}
                {searchResults.length > 0 ? (
                    <ListGroup>
                        {searchResults.map((flight, index) => (
                            <ListGroup.Item key={index}>
                                <h5>{flight.TenChuyenBay}</h5>
                                <p>Nơi đi: {flight.DiemDi}</p>
                                <p>Nơi đến: {flight.DiemDen}</p>
                                <p>Ngày: {flight.Ngay}</p>
                                <p>Loại ghế: {flight.LoaiGhe}</p>
                                <Button variant="success" onClick={() => handleSelectFlight(flight)}>
                                    Đặt vé
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>Không có chuyến bay nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchFlightResult;