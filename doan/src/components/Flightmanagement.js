import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FlightManagement = () => {
  const [flightmg, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    flightNumber: "",
    destination: "",
    origin: "",
    date: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingFlightId, setEditingFlightId] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch("http://localhost:5000/flightmgs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateFlightNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array(3)
      .fill()
      .map(() => letters.charAt(Math.floor(Math.random() * letters.length)))
      .join("");
    const randomNumbers = Math.floor(100 + Math.random() * 900); // Random 3 digits
    return randomLetters + randomNumbers;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);  // Kiểm tra giá trị thay đổi
    setFormData({ ...formData, [name]: value });
  };
  
  

  const handleAddOrEditFlight = async () => {
    if (!formData.destination || !formData.origin || !formData.date || !formData.price || !formData.selectedSeats) {
      alert("Please fill out all fields!");
      return;
    }

  try {
    const endpoint = isEditing
      ? `http://localhost:5000/flightmgs/${editingFlightId}`
      : "http://localhost:5000/flightmgs";
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MaChuyenBay: generateFlightNumber(),
        DiemDen: formData.destination,
        DiemDi: formData.origin,
        Ngay: formData.date,
        LoaiGhe: formData.selectedSeats,  // Đảm bảo gửi đúng LoaiGhe
        Gia: formData.price,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add/edit flight");
    }

    await fetchFlights();

    setFormData({
      flightNumber: "", // Reset flight number after saving
      destination: "",
      origin: "",
      date: "",
      selectedSeats: "", // Reset selected seats
      price: "",
    });

    setIsEditing(false);
    setEditingFlightId(null);

    alert(isEditing ? "Flight updated successfully!" : "Flight added successfully!");
  } catch (error) {
    console.error("Error adding/editing flight:", error);
    alert("An error occurred: " + error.message);
  }
};


const handleEditFlight = (flight) => {
  const date = flight.Ngay ? flight.Ngay.slice(0, 10) : "";

  setFormData({
    flightNumber: flight.MaChuyenBay,
    destination: flight.DiemDen,
    origin: flight.DiemDi,
    date: date,
    selectedSeats: flight.LoaiGhe,  // Đảm bảo giá trị LoaiGhe được truyền vào selectedSeats
    price: flight.Gia,
  });
  setEditingFlightId(flight._id);
  setIsEditing(true);
};


  const handleDeleteFlight = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/flightmgs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete flight");
      }

      await fetchFlights();
      alert("Flight deleted successfully!");
    } catch (error) {
      console.error("Error deleting flight:", error);
      alert("An error occurred. Please try again!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action bg-secondary text-white">
              Chức năng
            </button>
            <Link to="/flightmanagement" className="list-group-item list-group-item-action active no-underline">
              Quản lý chuyến bay
            </Link>
            <Link to="/adminflightform" className="list-group-item list-group-item-action">
              Quản lý vé
            </Link>
          </div>
        </div>
        <div className="col-md-9">
          <h2>Quản lý chuyến bay</h2>
          <form className="mb-4">
            
            <div className="form-group">
              <label>Điểm đi</label>
              <input
                type="text"
                className="form-control"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Enter origin"
              />
            </div>
            <div className="form-group">
              <label>Điểm đến</label>
              <input
                type="text"
                className="form-control"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Enter destination"
              />
            </div>
            <div className="form-group">
              <label>Ngày</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Loại ghế</label>
              <select
                className="form-control"
                name="selectedSeats"
                value={formData.selectedSeats}
                onChange={handleChange}
              >
                <option value="">Chọn loại ghế</option>
                <option value="Kinh tế">Economy</option>
                <option value="Thương gia">Business</option>
                <option value="Hạng nhất">First Class</option>
              </select>
            </div>
            <div className="form-group">
              <label>Giá</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddOrEditFlight}
            >
              {isEditing ? "Update Flight" : "Add Flight"}
            </button>
          </form>

          <h4>Danh sách chuyến bay</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Mã chuyến bay</th>
                <th>Điểm đi</th>
                <th>Điểm đến</th>
                <th>Ngày</th>
                <th>Loại ghế</th>
                <th>Giá</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flightmg.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">Không có chuyến bay nào.</td>
                </tr>
              ) : (
                flightmg.map((flight) => (
                  <tr key={flight._id}>
                    <td>{flight.MaChuyenBay}</td>
                    <td>{flight.DiemDi}</td>
                    <td>{flight.DiemDen}</td>
                    <td>{new Date(flight.Ngay).toLocaleDateString()}</td>
                    <td>{flight.LoaiGhe}</td>
                    <td>{flight.Gia} VND</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditFlight(flight)}>Sửa</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFlight(flight._id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default FlightManagement;
