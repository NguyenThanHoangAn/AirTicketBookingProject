const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
const Ticket = require('./models/Ticket');

const app = express();
const PORT = process.env.PORT || 5000;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
    tls: {
        rejectUnauthorized: false, 
    },
});

const sendTicketEmail = (customerInfo) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerInfo.email,
        subject: 'Xác nhận đặt vé thành công',
        text: `Cảm ơn bạn đã đặt vé! Dưới đây là mã vé của bạn:\n\n` +
              `Mã vé: ${customerInfo.ticketCode}\n` +
              `Chúc bạn có một chuyến đi vui vẻ!`,
    };

    console.log('Mail Options:', mailOptions); 

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Lỗi khi gửi email: ' + error);
        }
        console.log('Email đã được gửi: ' + info.response);
    });
};


// Middleware
app.use(cors());
app.use(express.json()); // Để phân tích dữ liệu JSON

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch(err => {
        console.error('Lỗi kết nối MongoDB:', err);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    });

// API để lấy danh sách người dùng
app.get('/tickets', async (req, res) => {
    try {
        const users = await Ticket.find(); // Lấy tất cả người dùng
        console.log(users); // Log dữ liệu để kiểm tra
        if (users.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }
        res.json(users);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error); // Log lỗi
        res.status(500).json({ message: error.message });
    }
});

app.post('/tickets', async (req, res) => {
  const { MaChuyenBay, MaVe, TenHanhKhach, CMND_Passport, Gia } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!MaChuyenBay || !MaVe || !TenHanhKhach || !CMND_Passport || !SDT || !Gia) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
  }

  try {
      const newTicket = new Ticket({
          MaChuyenBay,
          MaVe,
          TenHanhKhach,
          CMND_Passport,
          SDT,
          Gia
      });

      const savedTicket = await newTicket.save(); // Lưu vé mới vào MongoDB
      res.status(201).json(savedTicket); // Trả về vé mới đã lưu
  } catch (error) {
      console.error('Lỗi khi thêm vé:', error);
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

app.post('/tickets', async (req, res) => {
    const { MaChuyenBay, MaVe, TenHanhKhach, CMND_Passport, Gia, SDT } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!MaChuyenBay || !MaVe || !TenHanhKhach || !CMND_Passport || !SDT || !Gia) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    try {
        const newTicket = new Ticket({
            MaChuyenBay,
            MaVe,
            TenHanhKhach,
            CMND_Passport,
            SDT,
            Gia
        });

        const savedTicket = await newTicket.save(); // Lưu vé mới vào MongoDB

        const customerInfo = {
            ticketCode: savedTicket.MaVe,
            email: req.body.email, // Email từ body của request
        };
        
        if (!customerInfo.email || !customerInfo.ticketCode) {
            console.error('Thiếu dữ liệu email hoặc mã vé!');
            return res.status(400).json({ message: 'Thiếu dữ liệu email hoặc mã vé!' });
        }
        
        sendTicketEmail(customerInfo);
        
        res.status(201).json(savedTicket); // Trả về vé mới đã lưu
    } catch (error) {
        console.error('Lỗi khi thêm vé:', error);
        res.status(500).json({ message: error.message });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên http://localhost:${PORT}`);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
    console.log('MONGO_URI:', process.env.MONGO_URI);
});
