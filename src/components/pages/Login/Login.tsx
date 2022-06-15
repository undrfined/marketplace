import React from 'react';
import { FormikHelpers } from 'formik';
import Auth from '../Auth/Auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { login } from '../../../store/auth';
import { getInfo } from '../../../store/user';

type LoginValues = {
  email: string;
  password: string;
};

function Login() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((l) => l.auth.error);

  const handleValidate = (values: LoginValues) => {
    const errors: Partial<Record<keyof LoginValues, string>> = {};

    if (!values.email) {
      errors.email = 'Email required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 6) {
      errors.password = 'Password size must be greater than 5';
    }

    return errors;
  };

  const handleSubmit = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    dispatch(login(values)).then(() => {
      dispatch(getInfo());
      setSubmitting(false);
    });
  };

  return (
    <Auth
      onSubmit={handleSubmit}
      onValidate={handleValidate}
      inputs={[
        {
          type: 'email',
          placeholder: 'Email',
          name: 'email',
        },
        {
          type: 'password',
          placeholder: 'Password',
          name: 'password',
        },
      ]}
      initialValues={{ email: '', password: '' }}
      footerLinkText="Sign up"
      footerLinkNavigation="/signup"
      footerText="New user?"
      buttonText="Login"
      headerText="Welcome!"
      headerDescription="Enter information below for login"
      error={error}
      onClose={() => {

      }}
    />
  );
}

export default Login;
