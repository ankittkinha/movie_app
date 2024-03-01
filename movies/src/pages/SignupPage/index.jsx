import React, { useState } from 'react'
import styles from "./styles.module.css"
import Navbar from "../../components/Navbar"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";

export default function SignupPage() {

    const navigate = useNavigate()

    const [requestResponse, setRequestResponse] = useState({
        textMessage: "",
        alertClass: ""
    })

    const initialValues = {
        name: "",
        email: "",
        username: "",
        password: ""
    }

    const onSubmit = (values) => {
        axios.post("http://127.0.0.1:8000/api/users/signup/", values)
            .then((response) => {
                setRequestResponse({
                    textMessage: response.data.message,
                    alertClass: "alert alert-success"
                })

                setTimeout(() => {
                    navigate("/users/login")
                }, 3000)
            }, (error) => {
                console.log(error)
                setRequestResponse({
                    textMessage: error.response.data.message,
                    alertClass: "alert alert-danger text-center"
                })
                setTimeout(() => {
                    setRequestResponse({
                        textMessage: "",
                        alertClass: ""
                    })
                }, 3000)
            })
            .catch(error => console.log(error))
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("This is a required field.").min(3, "Name should have at least three characters."),
        email: Yup.string().required("This is a required field.").email("Enter a valid email."),
        username: Yup.string().required("This is a required field.").min(3, "Username should have at least three characters."),
        password: Yup.string().required("This is a required field.").min(6, "Password should have at least 6 characters.")
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true
    })

    return (
        <div className={`${styles.mainContainer}`}>
            <Navbar />
            <div className={`container mt-5 ${styles.signupContainer}`}>
                <div className={requestResponse.alertClass}>
                    {requestResponse.textMessage}
                </div>
                <h6 className={`${styles.greenText}`}>WELCOME </h6>
                <h2 className={`${styles.whiteText}`}>TO BOLETO</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='new-div'>
                        <div className="mb-3">
                            <label className={`form-label ${styles.greyText}`} htmlFor="name" >Name</label>
                            <input
                                type="text"
                                className={` ${styles.input} ${formik.errors.name && formik.touched.name ? "form-control is-invalid" : "form-control"}`}
                                id="name"
                                name="name"
                                placeholder="Full Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.name && formik.touched.name ? (<small className="text-danger"> {formik.errors.name} </small>) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className={`form-label ${styles.greyText}`}>Username</label>
                            <input
                                type="text"
                                className={` ${styles.input} ${formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}`}
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.username && formik.touched.username ? (<small className="text-danger"> {formik.errors.username} </small>) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className={`form-label ${styles.greyText}`}>Email</label>
                            <input
                                type="email"
                                className={` ${styles.input} ${formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"}`}
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email ? (<small className="text-danger"> {formik.errors.email} </small>) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className={`form-label ${styles.greyText}`}>Password</label>
                            <input
                                type="password"
                                className={` ${styles.input} ${formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}`}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.password && formik.touched.password ? (<small className="text-danger"> {formik.errors.password} </small>) : null}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className={`btn btn-primary text-center ${styles.submitBtn}`}>Sign Up</button>
                    </div>

                    <p className={`text-center ${styles.whiteText}`}>Already have an account? <Link className={`${styles.greenText}`} to={"/users/login"}>Login</Link></p>
                </form>
            </div>
        </div>

    )
}
