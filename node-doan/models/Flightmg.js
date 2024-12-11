const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    MaChuyenBay: { type: String, required: true },
    DiemDen: { type: String, required: true },
    DiemDi: { type: String, required: true },
    Ngay: { type: Date, required: true },
    LoaiGhe: { type: String, required: true },
    Gia: { type: Number, required: true }
}, { collection: 'Flightmgs' });

const Flightmg = mongoose.model("Flightmg", flightSchema);

module.exports = Flightmg;
