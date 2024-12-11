const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Ticket = require('./models/Ticket');
const Flightmg = require('./models/Flightmg');

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Sử dụng SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Bỏ qua xác thực chứng chỉ
    },
    debug: true, // Ghi chi tiết log gửi email
    logger: true, // Ghi log quá trình gửi email
});

// Hàm gửi email
const sendTicketEmail = (customerInfo) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerInfo.email,
        subject: 'Xác nhận đặt vé thành công',
        text: `Cảm ơn bạn đã đặt vé! Dưới đây là mã vé của bạn:\n\n` +
              `Mã vé: ${customerInfo.ticketCode}\n` +
              `Chúc bạn có một chuyến đi vui vẻ!`,
    };

    console.log('Đang chuẩn bị gửi email với thông tin:', mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Lỗi khi gửi email:', error);
            return; // Dừng lại nếu có lỗi
        }
        console.log('Email đã được gửi:', info.response);
    });
};

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch(err => {
        console.error('Lỗi kết nối MongoDB:', err);
        process.exit(1); // Thoát ứng dụng nếu không kết nối được
    });

// API để lấy danh sách vé
app.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy vé.' });
        }
        res.json(tickets);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ message: error.message });
    }
});

app.get('/flightmgs', async (req, res) => {
    try {
        const users = await Flightmg.find(); // Lấy tất cả người dùng
        console.log(users); // Log dữ liệu để kiểm tra
        if (users.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay.' });
        }
        res.json(users);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error); // Log lỗi
        res.status(500).json({ message: error.message });
    }
});

// API để thêm vé
app.post('/tickets', async (req, res) => {
    const { MaChuyenBay, MaVe, TenHanhKhach, CMND_Passport, Gia, SDT, email } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!MaChuyenBay || !MaVe || !TenHanhKhach || !CMND_Passport || !SDT || !Gia || !email) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    try {
        const newTicket = new Ticket({
            MaChuyenBay,
            MaVe,
            TenHanhKhach,
            CMND_Passport,
            SDT,
            Gia,
        });

        const savedTicket = await newTicket.save();

        const customerInfo = {
            ticketCode: savedTicket.MaVe,
            email: email,
        };

        // Gửi email xác nhận
        sendTicketEmail(customerInfo);

        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Lỗi khi thêm vé:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo vé. Vui lòng thử lại.' });
    }
});

app.post('/flightmgs', async (req, res) => {
    const { MaChuyenBay, DiemDen, DiemDi, Ngay, Gia } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!MaChuyenBay || !DiemDen || !DiemDi || !Ngay || !Gia) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    try {
        const newFlightmg = new Flightmg({
            MaChuyenBay,
            DiemDen,
            DiemDi,
            Ngay,
            Gia,
        });

        const savedFlightmg = await newFlightmg.save(); // Lưu chuyến bay mới
        res.status(201).json(savedFlightmg); // Trả về kết quả
    } catch (error) {
        console.error('Lỗi khi thêm chuyến bay:', error);
        res.status(500).json({ message: error.message });
    }
});


// API để cập nhật vé
app.put('/tickets/:id', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, { new: true });

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Không tìm thấy vé với ID này.' });
        }

      res.json(updatedTicket);
  } catch (error) {
      console.error('Lỗi khi cập nhật vé:', error);
      res.status(500).json({ message: error.message });
  }
});


app.delete('/tickets/:id', async (req, res) => {
  try {
      const ticketId = req.params.id;
      const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
      
      if (!deletedTicket) {
          return res.status(404).json({ message: 'Không tìm thấy vé với ID này.' });
      }
      
      res.json({ message: 'Vé đã được xóa thành công.' });
  } catch (error) {
      console.error('Lỗi khi xóa vé:', error);
      res.status(500).json({ message: error.message });
  }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
