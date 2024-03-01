import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import axios from 'axios'
import Navbar from '../../components/Navbar'
import Booking from '../../components/Booking'

export default function ShowBookings() {

  const [userBookings, setUserBookings] = useState([])

  const username = localStorage.getItem("username")
  const access_token = localStorage.getItem("access_token")

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/booking/${username}/`, {
        headers:{
          Authorization: `Bearer ${access_token}`
        }  
      
      })
      setUserBookings(response.data)
    } catch (error) {
      console.log(error)
    }

  }



  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Navbar />
      <div className={`container ${styles.mainContainer}`}>
        <h1 className={`text-center ${styles.whiteText} ${styles.heading}`} >Bookings </h1>
        <div className="row">
        {
    userBookings.length > 0 ? (
      userBookings.map((booking) => (
        <Booking key={booking.id} bookingTime={booking.booking_time}
          bookingID={booking.id} movie={booking.movie.title}
          theatre={booking.theatre} totalCost={booking.total_cost}
          seats={booking.seats} />
      ))
    ) : (
      <h2 className={`text-center mt-3 ${styles.whiteText}`}>No Bookings Available</h2>
    )
  }
        </div>
      </div>
    </div>
  )
}
