// e:\AirTicketBookingProject\doan\src\components\Plane.js

import React from 'react';
import Seat from './Seat';

function Plane({ cabin, selectSeat, selectedSeats }) {
  return (
    <ol className="cabin fuselage">
      {cabin.rows.map(row => (
        <li className="row" key={row.rowIndex}>
          <ol className="seats">
            {row.seats.map(seat => (
 <Seat
                key={seat.id}
                seat={seat}
                isSelected={selectedSeats.includes(seat.id)}
                onSelect={selectSeat}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default Plane;