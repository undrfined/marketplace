import React from "react";
import "./loginWindow.scss";
import MainPhoto from "./Components/MainPhoto";
import { Formik } from "formik";
import * as yup from "yup";

function App() {
  return (
    <div className="mainWindow">
      <div className="flexForPhotoAndLogin">
        <MainPhoto />
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
                const errors = { email: "", password: "" };
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 6) {
                  errors.password = "Password size must be greater than 5";
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

                  <p className="erorrMessage">
                    {errors.email && touched.email && errors.email}{" "}
                  </p>
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
              <a className="signUp" href="#">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
