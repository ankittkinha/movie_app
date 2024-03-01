import React, { useState } from 'react'
import styles from "./styles.module.css"
import Navbar from "../../components/Navbar"
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";

export default function ChangePassword() {
    const navigate = useNavigate()
    const { user_id} = useParams()

    const [requestResponse, setRequestResponse] = useState({
        textMessage: "",
        alertClass: ""
    })

    const initialValues = {
        password: ""
    }

    const onSubmit = (values) => {
        axios.put(`http://127.0.0.1:8000/api/users/${user_id}/changepass/`, values)
            .then((response) => {
                const data = response.data
                setRequestResponse({
                    textMessage: response.data.message,
                    alertClass: "alert alert-success"
                })
                navigate("/users/login")
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
                }, 2000)
            })
            .catch(error => console.log(error))
    }

    const validationSchema = Yup.object({
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
                <div className={`${styles.alertContainer} ${requestResponse.alertClass}`}>
                    {requestResponse.textMessage}
                </div>
                <h6 className={`${styles.greenText}`}>WELCOME </h6>
                <h2 className={`${styles.whiteText}`}>TO BOLETO</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='new-div'>

                        <div className="mb-3">
                            <label htmlFor="password" className={`form-label ${styles.greyText}`}>New Password</label>
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
                        <button type="submit" className={`btn btn-primary text-center ${styles.submitBtn}`}>Reset Password</button>
                    </div>

                </form>
            </div>
        </div>

    )
}
