import React from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Auth from '../Auth/Auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { login } from '../../../store/auth';
import { getAvatar, getInfo } from '../../../store/user';

type LoginValues = {
  email: string;
  password: string;
};

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((l) => l.auth.error);

  const validationScheme = yup.object().shape({
    email: yup.string().email('*Incorrect email').required('*Email required'),
    password: yup
      .string()
      .required('*Password required')
      .min(5, '*Password is too short - should be 5 chars minimum.'),
  });
  const handleSubmit = (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    dispatch(login(values)).then(() => {
      dispatch(getInfo());
      dispatch(getAvatar());
      navigate('/');
      setSubmitting(false);
    });
  };

  return (
    <Auth
      onSubmit={handleSubmit}
      validationSchema={validationScheme}
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
    />
  );
}

export default Login;
