import React from 'react'
import styles from "./styles.module.css"

export default function Booking(props) {
    const { bookingID, movie, seats, bookingTime, totalCost, theatre } = props

    const formatScreeningTime = (isoDateString) => {
        const dateObject = new Date(isoDateString);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes} ${day}-${month}-${year}`;
    };

    return (
        <div className={`col-sm-6 mb-3 mb-sm-0 ${styles.cardMain}`}>
            <div className="card">
                <div className={`card-body ${styles.cardBody}`}>
                    <div className={`container ${styles.headingDiv}`}>
                        <h5 className="card-title text-center"> {theatre.name} </h5>
                        <p className="card-title text-center"> {theatre.address}, {theatre.city} </p>
                    </div>

                    <hr />
                    <br />
                    <div className='d-flex justify-content-between'>
                        <small className="card-title">Booking ID: {bookingID} </small>
                        <small className="card-title">Booking time: {formatScreeningTime(bookingTime)} </small>
                    </div>

                    <p className="card-title"> {movie} </p>
                    <p className="card-title">Showtime: {formatScreeningTime(theatre.date)} </p>
                    <p className="card-title">Seats: Seats: {seats.map(seat => seat.seat_number).join(", ")} </p>

                    <p className="card-title">Total Cost: {totalCost} </p>
                </div>
            </div>
        </div>
    )
}
