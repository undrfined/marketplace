import React from "react";
import "./Styles/loginWindow.scss";
import MainPhoto from "./Components/MainPhoto";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="mainWindow">
      <div className="flexForPhotoAndLogin">
        <MainPhoto signUp={false} />
        <div className="loginMenu">
          <a href="#">
            {" "}
            <img className="cancel" src="images\vector.png" alt="cancel"></img>
          </a>
          <p className="welcomeField">Welcome</p>
          <p className="textField">Enter information below for login</p>
          <div className="loginForm">
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = "*Email required ";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "*Invalid email address ";
                }
                if (!values.password) {
                  errors.password = "*Password required ";
                } else if (values.password.length < 6) {
                  errors.password = "*Password size must be greater than 5 ";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    className="login input"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />

                  {/* <p className="erorrMessage">
                    {errors.email && touched.email && errors.email}{" "}
                  </p> */}
                  {/* <br></br> */}

                  <input
                    type="password"
                    name="password"
                    className="password input"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <p className="erorrMessage">
                    {errors.password && touched.password && errors.password}
                    {errors.email && touched.email && errors.email}{" "}
                  </p>
                  {/* <br></br> */}

                  <button
                    type="submit"
                    className="submitBtn"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>
            <p className="textField" id="signUp">
              New user?
              <a className="signUp" href="/signUp">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
