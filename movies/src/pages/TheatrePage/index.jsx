import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import styles from "./styles.module.css"

export default function TheatrePage() {

    const { movie_id } = useParams()
    const [theatre, setTheatre] = useState({})
    const [msg, setMsg] = useState(null)

    const access_token = localStorage.getItem("access_token")

    async function fetchdata() {
        const response = await axios.get(`http://localhost:8000/api/movie/${movie_id}/theatres/`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        let data = response.data
        if (data.message) {
            setMsg(data.message)
        } else {
            setTheatre(data)
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])


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
        <div>
            <Navbar />
            <div className="container my-3">
                <div className="card mb-3">
                    <div className={`card-body ${styles.container}`}>
                        <Link style={{ textDecoration: "none" }} to={(msg===null) ? `/movie/show/${theatre.id}/${movie_id}/seats/` : "#"}>
                            <div className="row">
                                <div className={`col-6 border-right ${styles.right}`}>
                                    <h5 className={`card-title text-center ${styles.whiteText}`}>{(msg===null) ? theatre.name : "No theatres available"}</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className={`text-center ${styles.whiteText}`}>{(msg===null) ? formatScreeningTime(theatre.date) : "No theatres available"}</h5>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>

        </div>
    )
}
