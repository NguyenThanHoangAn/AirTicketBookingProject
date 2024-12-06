import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FlightManagement = () => {
  return (
    <div className="container mt-4">
      
      <div className="row">
      <div className="col-md-3">
          <div className="list-group">
          <button className="list-group-item list-group-item-action bg-secondary text-white">
            Chức năng
          </button>
            <Link to={"/flightmanagement"}><button className="list-group-item list-group-item-action active">
              Quản lý chuyến bay
            </button></Link>
            <Link to="/adminflightform" className="list-group-item list-group-item-action ">
              Vé máy bay
            </Link>
          </div>
        </div>
        <div className="col-md-9">
        <h2>Quản lý chuyến bay</h2>
      <div className="mb-4">
        <h4>Thêm chuyến bay mới</h4>
        <form>
          <div className="form-group">
            <label>Mã Chuyến Bay</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập mã chuyến bay"
            />
          </div>
          <div className="form-group">
            <label>Điểm đến</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập điểm đến"
            />
          </div>
          <div className="form-group">
            <label>Điểm đi</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập điểm đi"
            />
          </div>
          <div className="form-group">
            <label>Ngày</label>
            <input
              type="date"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              className="form-control"
              placeholder="Nhập giá"
            />
          </div>
          <button type="button" className="btn btn-primary">
            Thêm chuyến bay
          </button>
        </form>
      </div>
      

      <h4>Danh sách chuyến bay</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Mã Chuyến Bay</th>
            <th>Điểm đến</th>
            <th>Điểm đi</th>
            <th>Ngày</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {/* Dữ liệu chuyến bay sẽ được hiển thị ở đây */}
          <tr>
            <td>VN123</td>
            <td>Hà Nội</td>
            <td>TP.HCM</td>
            <td>2023-10-01</td>
            <td>1,500,000 VND</td>
            <td>
              <button className="btn btn-danger">
                Xóa
              </button>
            </td>
          </tr>
          {/* Thêm các chuyến bay khác ở đây */}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};

export default FlightManagement;