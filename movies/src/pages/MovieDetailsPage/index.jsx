import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import styles from "./styles.module.css"

export default function MovieDetailsPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState({})

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:8000/api/movie/${id}/details/`)
      const data = response.data
      setMovie(data.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div >
      <Navbar />
      <div className={`card mb-3 ${styles.mainContainer}`}>
        <div className="row g-0">
          <div className="col-md-3">
            <img src={movie.image} style={{ height: '300px', width: 'auto', marginLeft: "7em" }} height={"100px"} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5 className={`card-title ${styles.whiteText}`}>{movie.title}</h5>
              <p className={`card-title ${styles.greyText} ${styles.text}`}>{movie.language}</p>
              <p className={`card-title ${styles.greyText} ${styles.text}`}>{movie.genre}</p>

              <FaRegCalendarAlt size="14px" color="rgb(221, 218, 218)" className="my-custom-class" />
              <span className={`card-title ${styles.greyText} ${styles.year}`}>{movie.release_year}</span>

              <FaRegClock size="14px" color="rgb(221, 218, 218)" />
              <span className={`card-title ${styles.greyText} ${styles.runtime}`}>{movie.runtime}</span>
              <div className={`d-flex justify-content-between align-items-center ${styles.bottomDiv}`}>
                <p className={`card-text ${styles.greyText} ${styles.desc}`}>{movie.description}</p>
                <Link className={`btn btn-primary text-center ${styles.bookBtn}`} to={`/movie/${id}/theatres/`} >Book Tickets</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
