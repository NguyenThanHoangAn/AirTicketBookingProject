import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminFlightForm = () => {
  const [formData, setFormData] = useState({
    flightNumber: "",
    ticketNumber: "",
    passengerName: "",
    passportNumber: "",
    sdt: "",
    price: "",
  });

  const [ticketList, setTicketList] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null); // ID vé đang sửa
  const [isEditing, setIsEditing] = useState(false); // Kiểm soát việc hiển thị form

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
        const response = await fetch("http://localhost:5000/tickets");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const mappedData = data.map((ticket) => ({
            _id: ticket._id,
            flightNumber: ticket.MaChuyenBay,
            ticketNumber: ticket.MaVe,
            passengerName: ticket.TenHanhKhach,
            passportNumber: ticket.CMND_Passport,
            price: ticket.Gia,
            sdt: ticket.SDT,
            selectedSeats: ticket.selectedSeats // Lưu số ghế đã chọn
        }));
        setTicketList(mappedData);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      flightNumber: "",
      ticketNumber: "",
      passengerName: "",
      passportNumber: "",
      sdt: "",
      price: "",
    });
    setEditingTicketId(null);
    setIsEditing(false);
  };

  const handleAddOrUpdateTicket = async () => {
    if (
      !formData.flightNumber ||
      !formData.passengerName ||
      !formData.passportNumber ||
      !formData.price ||
      !formData.sdt
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch(
        editingTicketId
          ? `http://localhost:5000/tickets/${editingTicketId}`
          : "http://localhost:5000/tickets",
        {
          method: editingTicketId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MaChuyenBay: formData.flightNumber,
            MaVe: formData.ticketNumber,
            TenHanhKhach: formData.passengerName,
            CMND_Passport: formData.passportNumber,
            SDT: formData.sdt,
            Gia: formData.price,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to ${editingTicketId ? "update" : "add"} ticket: ${errorMessage}`);
      }

      await fetchTickets(); // Cập nhật lại danh sách vé
      handleReset(); // Làm mới form

      alert("Cập nhật vé thành công!"); // Thông báo cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi thêm/sửa vé:", error);
      alert(error.message);
    }
  };

  const handleEditTicket = (ticket) => {
    const confirmEdit = window.confirm(
      `Bạn có chắc chắn muốn chỉnh sửa vé: ${ticket.ticketNumber}?`
    );
    if (!confirmEdit) {
      return;
    }

    setFormData({
      flightNumber: ticket.flightNumber,
      ticketNumber: ticket.ticketNumber,
      passengerName: ticket.passengerName,
      passportNumber: ticket.passportNumber,
      sdt: ticket.sdt,
      price: ticket.price,
    });
    setEditingTicketId(ticket._id);
    setIsEditing(true);
  };

  const handleDeleteTicket = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vé này không?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/tickets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete ticket");
      }

      await fetchTickets(); // Cập nhật lại danh sách vé
      alert("Xóa vé thành công!"); // Thông báo xóa vé thành công
    } catch (error) {
      console.error("Lỗi khi xóa vé:", error);
      alert("Đã xảy ra lỗi khi xóa vé.");
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
            <Link to={"/flightmanagement"} className="list-group-item list-group-item-action">
                Quản lý chuyến bay
            </Link>
            <Link
              to="/adminflightform"
              className="list-group-item list-group-item-action active"
            >
              Vé máy bay
            </Link>
          </div>
        </div>
        <div className="col-md-9">
          <h2>Quản lý vé máy bay</h2>
          {isEditing && (
            <form className="mb-4">
              <div className="form-group">
                <label>Mã Chuyến Bay</label>
                <input
                  type="text"
                  className="form-control"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Mã Vé</label>
                <input
                  type="text"
                  className="form-control"
                  name="ticketNumber"
                  value={formData.ticketNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Tên Hành Khách</label>
                <input
                  type="text"
                  className="form-control"
                  name="passengerName"
                  value={formData.passengerName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Số Hộ Chiếu</label>
                <input
                  type="text"
                  className="form-control"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Số Điện Thoại</label>
                <input
                  type="text"
                  className="form-control"
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Giá</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={handleAddOrUpdateTicket}
              >
                Cập Nhật
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={handleReset}
              >
                Làm Mới
              </button>
            </form>
          )}
          <h3>Danh sách vé</h3>
          <table className="table">
          <thead>
              <tr>
                  <th>Mã Vé</th>
                  <th>Mã Chuyến Bay</th>
                  <th>Tên Hành Khách</th>
                  <th>Số Hộ Chiếu</th>
                  <th>Số Điện Thoại</th>
                  <th>Giá</th>
                  <th>Số ghế</th> {/* Cột số ghế */}
                  <th>Hành Động</th>
              </tr>
          </thead>
          <tbody>
              {ticketList.map((ticket) => (
                  <tr key={ticket._id}>
                      <td>{ticket.ticketNumber}</td>
                      <td>{ticket.flightNumber}</td>
                      <td>{ticket.passengerName}</td>
                      <td>{ticket.passportNumber}</td>
                      <td>{ticket.sdt}</td>
                      <td>{ticket.price}</td>
                      <td>{ticket.selectedSeats}</td> {/* Hiển thị số ghế */}
                      <td>
                          <button
                              className="btn btn-warning btn-sm"
                              onClick={() => handleEditTicket(ticket)}
                          >
                              Sửa
                          </button>
                          <button
                              className="btn btn-danger btn-sm ml-2"
                              onClick={() => handleDeleteTicket(ticket._id)}
                          >
                              Xóa
                          </button>
                      </td>
                  </tr>
              ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFlightForm;
