// import logo from '';
import React from "react";
import MainPhoto from "./Components/MainPhoto";
import { Formik } from "formik";
import "./Styles/SignUp.scss";
import { Link } from "react-router-dom";

function Registry() {
  return (
    <div className="mainWindow">
      <div className="flexOnLoginAndPhoto">
        <MainPhoto signUp={true} />
        <div className="rightPartDiv">
          <div className="cancelDiv">
            <a href="#">
              <img src="images\vector.png" alt="vector" />
            </a>
          </div>
          <div className="loginBlockDiv">
            <p className="mainText">Sign up</p>
            <p className="textField">Enter information below for login</p>
            <Formik
              initialValues={{
                email: "",
                password: "",
                name: "",
                surname: "",
                confirmPassword: "",
              }}
              validate={(values) => {
                const errors: any = {};
                if (!values.name) {
                  errors.name = "*Name required ";
                } else if (!/[A-Za-z]+/i.test(values.name)) {
                  errors.name = "*Invalid name";
                }
                if (!values.surname) {
                  errors.surname = "*Surname required ";
                } else if (!/[A-Za-z]+/i.test(values.surname)) {
                  errors.surname = "*Invalid surname";
                }
                if (!values.email) {
                  errors.email = "*Email required ";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "*Invalid email address";
                }
                if (!values.password) {
                  errors.password = "*Password required";
                } else if (values.password.length < 6) {
                  errors.password = "*Password size must be greater than 5";
                }
                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "*Password must be the same";
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
                  <div className="flexOnNameSurname">
                    <input
                      type="text"
                      name="name"
                      className="input nameField"
                      placeholder="First name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <input
                      type="text"
                      name="surname"
                      className=" input surnameField"
                      placeholder="Last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.surname}
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    className="login input"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />

                  <input
                    type="password"
                    name="password"
                    className="password input"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    className=" input"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  <p className="erorrMessage">
                    {errors.name && touched.name && errors.name}
                    {errors.surname && touched.surname && errors.surname}
                    {errors.password && touched.password && errors.password}
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                    {errors.email && touched.email && errors.email}{" "}
                  </p>
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
          </div>
          <div className="bottomSignUp">
            <p className="textField">
              Back to{" "}
              <a id="signUpRefLink" href="/login">
                <span id="signUpSpanRef">Login</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registry;
