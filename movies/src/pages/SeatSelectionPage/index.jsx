import React, { useEffect, useState } from 'react';
import Seat from "../../components/Seat";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./styles.module.css"
import Navbar from "../../components/Navbar"

export default function SeatSelectionPage() {

    const navigate = useNavigate()

    const { theatre_id, movie_id } = useParams()
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedSeatsNum, setSelectedSeatsNum] = useState([])
    const [totalCost, setTotalcost] = useState(0)

    const [resetCounter, setResetCounter] = useState(0);

    const username = localStorage.getItem("username")
    const token = localStorage.getItem("access_token")


    async function fetchData() {
        const accessToken = localStorage.getItem("access_token")

        try {
            const response = await axios.get(`http://localhost:8000/api/theatre/${theatre_id}/seats/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            console.log(response.data)
            setSeats(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleSeatSelection = (seat_id, seat_number, seat_price) => {
        if (selectedSeats.includes(seat_id)) {
            setSelectedSeats(selectedSeats.filter(seat => seat != seat_id))
            setSelectedSeatsNum(selectedSeatsNum.filter(seat => seat != seat_number))
            setTotalcost(totalCost - seat_price)
        } else {
            setSelectedSeats([...selectedSeats, seat_id]);
            setSelectedSeatsNum([...selectedSeatsNum, seat_number]);
            setTotalcost(totalCost + seat_price)
        }
    }


    const handleClick = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/users/booking/${username}/`,
                {
                    user: "",
                    total_cost: totalCost,
                    seats: selectedSeats,
                    movie: movie_id,
                    theatre: theatre_id
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }

            })
            setSelectedSeats([])
            setSelectedSeatsNum([])
            setTotalcost(0)
            fetchData()
            setResetCounter(prevCounter => prevCounter + 1);
            alert("Your tickets have been booked.")
            navigate("/users/bookings/")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <Navbar />

            <div className={`container`}>
                <div className={`${styles.screen}`} >

                </div>

                <div className={`text-center ${styles.seatsPart}`}>
                    {
                        seats.map((seat, i) => {
                            return <Seat key={i} seat_number={seat.seat_number} seat_id={seat.id} seat_price={seat.price} is_reserved={seat.is_reserved} handleSeatSelection={handleSeatSelection} resetCounter={resetCounter} />

                        })
                    }

                </div>
                <div className={`d-flex justify-content-between ${styles.whiteText} ${styles.lastDiv}`}>
                    <div className={` ${styles.seatsDiv}`}>
                        <p>Seats Selected: </p>
                        <p className={`${styles.seatNum}`}>{selectedSeatsNum.join(", ")}</p>
                    </div>
                    <div className={`${styles.whiteText} ${styles.costDiv}`}>
                        <p className='text-center'> Total Cost: </p>
                        <p className='text-center'>{totalCost}</p>
                    </div>
                    <div className={`d-flex align-items-center ${styles.btnDiv}`} >
                        <button className={`btn btn-primary ms-auto ${styles.bookBtn}`} onClick={handleClick} >Book Tickets</button>
                    </div>
                </div>
            </div>
        </>

    )
}
