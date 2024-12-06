// e:\AirTicketBookingProject\doan\src\components\Seat.js

import React from 'react';

const Seat = ({ seat, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(seat.id);
  };

  return (
    <li
      className={`seat ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {seat.label}
    </li>
  );
};

export default Seat;