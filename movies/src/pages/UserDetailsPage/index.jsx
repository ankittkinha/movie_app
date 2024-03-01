import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./styles.module.css"

export default function UserDetailsPage() {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({})

    const accessToken = localStorage.getItem("access_token")
    const username = localStorage.getItem("username")

    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/details/${username}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const data = response.data
            setUserDetails(data)
        } catch (error) {
            console.log(error)
        }
    }


    async function deactivateAccount() {
        try {
            const response = await axios.put(`http://localhost:8000/api/users/details/${username}/`, {
                username: username,
                is_active: false
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            localStorage.removeItem("access_token")
            localStorage.removeItem("username")
        } catch (error) {
            console.log(error);
        }
    }

    function logoutAccount() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("username")
        navigate("/users/login")
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={`${styles.mainContainer}`}>
            <Navbar />
            <div className={`card ${styles.panelContainer}`}>
                <h5 className={`card-header ${styles.header} ${styles.colorWhite}`}>User Panel</h5>
                <div className="card-body">
                    <p className={`card-title ${styles.colorWhite}`}>Username: <strong>{userDetails.username}</strong></p>
                    <p className={`card-title ${styles.colorWhite}`}>Name: <strong>{userDetails.name}</strong></p>
                    <p className={`card-title ${styles.colorWhite}`}>Email: <strong>{userDetails.email}</strong></p>

                </div>
                <div class={`card-footer text-body-secondary d-flex justify-content-between ${styles.footer}`}>
                <Link className={`btn btn-primary ${styles.bookingsBtn}`} to={"/users/bookings/"}>My Bookings</Link>
                        <button onClick={deactivateAccount} className={`btn btn-primary ${styles.accountBtn}`}>Deactivate Account</button>
                        <button onClick={logoutAccount} className={`btn btn-primary ${styles.logoutBtn}`}>Logout</button>
                </div>
            </div>
        </div>
    )
}
