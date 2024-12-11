const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    MaChuyenBay: { type: String, required: true },
    MaVe: { type: String, required: true },
    TenHanhKhach: { type: String, required: true },
    CMND_Passport: { type: String, required: true }, // Sử dụng String cho CMND/Passport
    Gia: { type: Number, required: true },
    SDT: { type: String, required: true },
    selectedSeats: {type: [String], require: true}
}, { collection: 'Tickets' }); 

const Ticket = mongoose.model("Ticket ", userSchema); 

module.exports = Ticket;