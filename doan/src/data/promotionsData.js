// src/data/promotionsData.js

// Import local promotion images
import promotion1 from '../images/promotion1.jpg';
import promotion2 from '../images/promotion2.jpg';
import promotion3 from '../images/promotion3.jpg';
// Add more imports if you have more promotions

// Define promotions data
const promotions = [
    {
        id: 1,
        image: promotion1,
        title: "Giảm giá 20% cho chuyến bay đầu tiên",
        description: "Đăng ký và mua vé ngay để nhận ưu đãi hấp dẫn.",
        buttonText: "Xem chi tiết",
        buttonVariant: "primary",
    },
    {
        id: 2,
        image: promotion2,
        title: "Ưu đãi mùa hè",
        description: "Khám phá những điểm đến tuyệt vời với giá ưu đãi.",
        buttonText: "Xem chi tiết",
        buttonVariant: "primary",
    },
    {
        id: 3,
        image: promotion3,
        title: "Ưu đãi nhóm",
        description: "Mua vé nhóm để nhận thêm nhiều ưu đãi đặc biệt.",
        buttonText: "Xem chi tiết",
        buttonVariant: "primary",
    },
    // Add more promotion objects as needed
];

export default promotions;
