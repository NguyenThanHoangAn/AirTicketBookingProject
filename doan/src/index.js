import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import AdminFlightForm from './components/AdminFlightForm';
import FlightManagement from './components/Flightmanagement';
import BookingPage from './components/BookingPage';
import CustomerInfoPage from './components/CustomerInfoPage';
import Confirmation from './components/Confirmation';
import Payment from './components/Payment';
import Seat from './components/Seat';
import FlightInfo from './components/FligthInfo';
import SearchFlightResult from './components/SearchFlightResult';
import Support from './components/Support';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/booking" element={<BookingPage />} />
    <Route path="/search-flight-result" element={<SearchFlightResult />} />
    <Route path="/customer-info" element={<CustomerInfoPage />} />
    <Route path='/seat' element={<Seat />} />
    <Route path='/payment' element={<Payment /> }/>
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="/adminflightform" element={<AdminFlightForm />}/>
    <Route path="/flightmanagement" element={<FlightManagement />}/>
    <Route path="/flight-info" element={<FlightInfo />} />
    <Route path="/support" element={<Support />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();