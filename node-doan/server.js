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
        const flights = await Flightmg.find(); // Lấy tất cả chuyến bay
        if (flights.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay.' });
        }
        res.json(flights);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ message: error.message });
    }
});


app.get('/tickets/soghe/:MaChuyenBay', async (req, res) => {
    try {
        const flightCode = req.params.MaChuyenBay; // Lấy mã chuyến bay từ URL

        // Truy vấn MongoDB để tìm vé theo mã chuyến bay
        const tickets = await Ticket.find({ MaChuyenBay: flightCode });

        // Kiểm tra nếu không tìm thấy vé
        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy vé cho chuyến bay này.' });
        }

        // Lấy danh sách số ghế từ các vé
        const seatNumbers = tickets.flatMap(ticket => ticket.selectedSeats);

        // Trả về danh sách số ghế
        res.json({ seats: seatNumbers });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu.' });
    }
});

// API to get ticket by ticket code (MaVe)
app.get('/tickets/:MaVe', async (req, res) => {
    try {
        const flightCode = req.params.MaVe;
        const ticket = await Ticket.findOne({ MaVe: flightCode }); // Use findOne to get a single ticket

        if (!ticket) {
            return res.status(404).json({ message: 'Không tìm thấy vé cho chuyến bay này.' });
        }

        res.json(ticket); // Return the single ticket object
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: error.message });
    }
});


// API để thêm vé
app.post('/tickets', async (req, res) => {
    const { MaChuyenBay, MaVe, TenHanhKhach, CMND_Passport, Gia, SDT, email, selectedSeats } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!MaChuyenBay || !MaVe || !TenHanhKhach || !CMND_Passport || !SDT || !Gia || !email || !selectedSeats) {
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
            selectedSeats // Lưu số ghế đã chọn trực tiếp dưới dạng mảng
        });

        const savedTicket = await newTicket.save();

        // Gửi email xác nhận
        sendTicketEmail({ ticketCode: savedTicket.MaVe, email });

        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Lỗi khi thêm vé:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo vé. Vui lòng thử lại.' });
    }
});

app.post('/flightmgs', async (req, res) => {
    const { DiemDen, DiemDi, Ngay, Gia, LoaiGhe, MaChuyenBay } = req.body;

    console.log("Received data:", req.body);

    // Kiểm tra dữ liệu có đầy đủ không
    if (!DiemDen || !DiemDi || !Ngay || !LoaiGhe || !Gia) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    // Kiểm tra xem Ngay có phải là một ngày hợp lệ không
    if (isNaN(new Date(Ngay).getTime())) {
        return res.status(400).json({ message: 'Ngày không hợp lệ!' });
    }

    // Tạo mã chuyến bay nếu không có trong yêu cầu
    const flightCode = MaChuyenBay || generateFlightCode(); // Giả sử generateFlightCode() là một hàm sinh mã chuyến bay duy nhất

    try {
        // Tạo đối tượng chuyến bay mới
        const newFlight = new Flightmg({
            MaChuyenBay: flightCode,
            DiemDen,
            DiemDi,
            Ngay,
            LoaiGhe,
            Gia
        });

        // Lưu chuyến bay vào cơ sở dữ liệu
        const savedFlight = await newFlight.save();

        // Trả về kết quả thành công
        res.status(201).json(savedFlight);
    } catch (error) {
        // Log lỗi và trả về thông báo lỗi cho người dùng
        console.error('Lỗi khi thêm chuyến bay:', error);
        res.status(500).json({ message: 'Không thể thêm chuyến bay. Vui lòng thử lại sau.' });
    }
});




// API để cập nhật vé
// API để cập nhật vé
app.put('/tickets/:id', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const { MaChuyenBay, selectedSeats } = req.body;

        // Kiểm tra xem vé có cùng mã chuyến bay và số ghế đã tồn tại không
        const existingTicket = await Ticket.findOne({ 
            _id: { $ne: ticketId }, // Không kiểm tra vé hiện tại
            MaChuyenBay,
            selectedSeats 
        });

        if (existingTicket) {
            return res.status(400).json({ message: 'Vé với mã chuyến bay và số ghế này đã tồn tại!' });
        }

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

app.put('/flightmgs/:id', async (req, res) => {
    const { DiemDen, DiemDi, Ngay, Gia, LoaiGhe } = req.body;  // Thêm LoaiGhe vào đây

    if (!DiemDen || !DiemDi || !Ngay || !Gia || !LoaiGhe) {  // Kiểm tra trường LoaiGhe
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    try {
        const updatedFlight = await Flightmg.findByIdAndUpdate(
            req.params.id,
            { DiemDen, DiemDi, Ngay, Gia, LoaiGhe },  // Cập nhật thêm LoaiGhe
            { new: true }
        );

        if (!updatedFlight) {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay.' });
        }

        res.json(updatedFlight);
    } catch (error) {
        console.error('Lỗi khi cập nhật chuyến bay:', error);
        res.status(500).json({ message: 'Không thể cập nhật chuyến bay. Vui lòng thử lại.' });
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

// API để xóa chuyến bay
app.delete('/flightmgs/:id', async (req, res) => {
    try {
        const flightId = req.params.id;
        const deletedFlight = await Flightmg.findByIdAndDelete(flightId);

        if (!deletedFlight) {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay với ID này.' });
        }

        res.json({ message: 'Chuyến bay đã được xóa thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa chuyến bay:', error);
        res.status(500).json({ message: error.message });
    }
});




// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
