import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListGroup, Button, Card } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const SearchFlightResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the filtered flights from location.state
    const { filteredFlights = [] } = location.state || {};
    const [searchResults, setSearchResults] = useState(filteredFlights); // State to store search results

    useEffect(() => {
        // Initialize search results with filtered flights
        setSearchResults(filteredFlights);
    }, [filteredFlights]);

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