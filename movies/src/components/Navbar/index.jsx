import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./styles.module.css"

export default function Navbar() {
    let username = localStorage.getItem("username")

    if (username){
        let len = username.length
        if (len > 10) {
            username = username.slice(0, 10)
        }
    }


    return (
        <nav className={`navbar navbar-expand-lg bg-body-tertiary ${styles.navbarMainBody}`} >
            <div className={`container-fluid ${styles.navbarDesign}`}>
                <Link className={`navbar-brand fs-6 fw-bold ${styles.title}`} to="/">BOLE<span className={styles.titleColoredText}>TO</span></Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item home-text">
                            <Link className={`nav-link active ${styles.homeText}`} style={{ color: "white", fontSize: "1.2em" }} aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <Link className={`btn btn-outline-success ${styles.joinBtn}`} to={username ? "/users/details/" : "/users/signup"} >{username ? username : "Join Us"}</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}
