import React from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { login, signUp } from '../../../store/auth';
import { getInfo } from '../../../store/user';

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

  const handleValidate = (values: SignUpValues) => {
    const errors: Partial<Record<keyof SignUpValues, string>> = {};

    if (!values.name) {
      errors.name = '*Name required ';
    } else if (!/[A-Za-z]+/i.test(values.name)) {
      errors.name = '*Invalid name';
    }

    if (!values.surname) {
      errors.surname = '*Surname required ';
    } else if (!/[A-Za-z]+/i.test(values.surname)) {
      errors.surname = 'Invalid surname';
    }

    if (!values.email) {
      errors.email = '*Email required ';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = '*Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 6) {
      errors.password = 'Password size must be greater than 5';
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password must be the same';
    }

    return errors;
  };

  const handleSubmit = (values: SignUpValues, { setSubmitting }: FormikHelpers<SignUpValues>) => {
    dispatch(signUp(values)).then((result) => {
      if (!('error' in result)) {
        dispatch(login({
          email: values.email,
          password: values.password,
        })).then(() => {
          navigate('/');
          dispatch(getInfo());
        });
      }

      setSubmitting(false);
    });
  };

  return (
    <Auth
      onSubmit={handleSubmit}
      onValidate={handleValidate}
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
        email: '', password: '', confirmPassword: '', name: '', surname: '',
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
