import React from 'react'
import styles from "./styles.module.css"
import popcornLogo from "../../images/popcornLogo.png"
import { Link } from 'react-router-dom'

export default function Movie(props) {
    return (
        <div className="col-sm-3 mb-3 mb-sm-0 my-5">
            <div className="card" style={{ width: "20em" }}>
                <img src={props.imgurl} height={"350em"} className="card-img-top" alt="..." />
                <Link to={`/movie/${props.id}/details/`} style={{ textDecoration: 'none' }}>
                    <div className={`card-body ${styles.body}`}>
                        <h5 className={`card-title ${styles.title}`}>{props.title}</h5>
                        <p className={`card-text ${styles.text}`}>{props.description}</p>
                        <div className={`d-flex justify-content-start ${styles.ratingDiv}`}>
                            <img src={popcornLogo} height={"24px"} className="cardLogo" alt="..." />
                            <span className={`${styles.span}`}>{props.rating}</span>
                        </div>

                    </div>
                </Link>
            </div>
        </div>
    )
}
