import React from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Auth from '../Auth/Auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { signUp } from '../../../store/auth';
import { getAvatar, getInfo } from '../../../store/user';

type SignUpValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((l) => l.auth.error);
  const validationScheme = yup.object().shape({
    name: yup.string().required('*Name required'),
    surname: yup.string().required('*Surname required'),
    email: yup.string().email('*Incorrect email').required('* Email required'),
    password: yup
      .string()
      .required('*Password required')
      .min(5, '*Password is too short - should be 5 chars minimum.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '*Passwords must match'),
  });

  const handleSubmit = (
    values: SignUpValues,
    { setSubmitting }: FormikHelpers<SignUpValues>
  ) => {
    dispatch(signUp(values)).then((result) => {
      if (!('error' in result)) {
        navigate('/');
        dispatch(getInfo());
        dispatch(getAvatar());
      }

      setSubmitting(false);
    });
  };

  return (
    <Auth
      onSubmit={handleSubmit}
      validationSchema={validationScheme}
      inputs={[
        [
          {
            type: 'text',
            placeholder: 'First Name',
            name: 'name',
          },
          {
            type: 'text',
            placeholder: 'Last Name',
            name: 'surname',
          },
        ],
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
        {
          type: 'password',
          placeholder: 'Confirm password',
          name: 'confirmPassword',
        },
      ]}
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
      }}
      footerLinkText="login"
      footerLinkNavigation="/login"
      footerText="Back to"
      buttonText="Next"
      error={error}
      headerText="Sign Up"
      headerDescription="Just a few quick steps to create your account"
    />
  );
}

export default SignUp;
