
import flight1 from '../images/hcm.jpg';
import flight2 from '../images/hanoi.jpg';
import flight3 from '../images/danang.jpg';
import flight4 from '../images/cantho.jpg';
import flight5 from '../images/nhatrang.jpg';
import flight6 from '../images/dalat.jpg';

const flights = [
    {
        id: 1,
        image: flight1,
        route: "Hà Nội (HAN) đến Tp. Hồ Chí Minh (SGN)",
        date: "15/11/2024",
        price: "1,200,000₫",
        lastView: 1500,
        badge: "Ưu đãi",
    },
    {
        id: 2,
        image: flight2,
        route: "Đà Nẵng (DAD) đến Hà Nội (HAN)",
        date: "20/11/2024",
        price: "1,150,000₫",
        lastView: 1200,
        badge: "Mới",
    },
    {
        id: 3,
        image: flight3,
        route: "Cần Thơ (CXR) đến Đà Nẵng (DAD)",
        date: "25/11/2024",
        price: "980,000₫",
        lastView: 900,
        badge: "Ưu đãi",
    },
    {
        id: 4,
        image: flight4,
        route: "Hà Nội (HAN) đến Cần Thơ (CXR)",
        date: "30/11/2024",
        price: "750,000₫",
        lastView: 800,
        badge: "Sale",
    },
    {
        id: 5,
        image: flight5,
        route: "Hồ Chí Minh (SGN) đến Nha Trang (CXR)",
        date: "05/12/2024",
        price: "1,050,000₫",
        lastView: 1100,
        badge: "Mới",
    },
    {
        id: 6,
        image: flight6,
        route: "Hà Nội (HAN) đến Đà Lạt (DLI)",
        date: "10/12/2024",
        price: "1,300,000₫",
        lastView: 1300,
        badge: "Ưu đãi",
    },
];

export default flights;
