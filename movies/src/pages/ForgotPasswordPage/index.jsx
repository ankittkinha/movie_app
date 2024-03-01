import React, { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });


  const initialValues = {
    email: "",
  };


  const onSubmit = async (values) => {

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/forget/", values)

      setRequestResponse({
        textMessage: response.data.message,
        alertClass: "alert alert-success",
      });

      setTimeout(() => {
        navigate(`/users/${response.data.data.id}/pass/`)
      }, 1000)
    } catch (error) {
      console.log(error)

      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred"; 

      setRequestResponse({
        textMessage: errorMessage,
        alertClass: "alert alert-danger text-center"
      });

      setTimeout(() => {
        setRequestResponse({
          textMessage: "",
          alertClass: ""
        });
      }, 2000);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("This is a required field.")
      .email("Enter a valid email"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className={`${styles.mainContainer}`}>
      <Navbar />
      <div className={`container mt-5 ${styles.signupContainer}`}>
        <div
          className={`${styles.alertContainer} ${requestResponse.alertClass}`}
        >
          {requestResponse.textMessage}
        </div>
        <h6 className={`${styles.greenText}`}>WELCOME </h6>
        <h2 className={`${styles.whiteText}`}>TO BOLETO</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="new-div">
            <div className="mb-3">
              <label
                htmlFor="email"
                className={`form-label ${styles.greyText}`}
              >
                Email
              </label>
              <input
                type="text"
                className={` ${styles.input} ${formik.errors.email && formik.touched.email
                  ? "form-control is-invalid"
                  : "form-control"
                  }`}
                id="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <small className="text-danger"> {formik.errors.email} </small>
              ) : null}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className={`btn btn-primary text-center ${styles.submitBtn}`}
            >
              Verify Email
            </button>
          </div>

          <p className={`text-center ${styles.whiteText}`}>
            Don't have an account?{" "}
            <Link className={`${styles.greenText}`} to={"/users/signup"}>
              Signup now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
