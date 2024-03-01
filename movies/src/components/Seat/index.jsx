import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";

const Seat = (props) => {
    const { seat_number, seat_id, seat_price, is_reserved, resetCounter } = props

    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        setIsSelected(false);
    }, [resetCounter]);


    const handleClick = () => {
        setIsSelected(!isSelected)
        props.handleSeatSelection(seat_id, seat_number, seat_price)
    }


    return (
        <div className={`${styles.eachSeat}`}>
            <button className={`${styles.seat} text-center`} onClick={handleClick} style={{backgroundColor: isSelected ? "rgb(96, 10, 94)" : "rgb(49, 120, 56)"}} disabled={is_reserved}>
                <span>{seat_number}</span>
            </button>
        </div>
    );
};
export default Seat;