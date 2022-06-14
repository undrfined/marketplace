import React from 'react';
import { FormikHelpers } from 'formik';
import Auth from '../Auth/Auth';

type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUp() {
  const handleValidate = (values: SignUpValues) => {
    const errors: Partial<Record<keyof SignUpValues, string>> = {};

    if (!values.firstName) {
      errors.firstName = '*Name required ';
    } else if (!/[A-Za-z]+/i.test(values.firstName)) {
      errors.firstName = '*Invalid name';
    }

    if (!values.lastName) {
      errors.lastName = '*Surname required ';
    } else if (!/[A-Za-z]+/i.test(values.lastName)) {
      errors.lastName = 'Invalid surname';
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
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
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
            name: 'firstName',
          },
          {
            type: 'text',
            placeholder: 'Last Name',
            name: 'lastName',
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
        email: '', password: '', confirmPassword: '', firstName: '', lastName: '',
      }}
      footerLinkText="login"
      footerLinkNavigation="/login"
      footerText="Back to"
      buttonText="Next"
      headerText="Sign Up"
      headerDescription="Just a few quick steps to create your account"
      onClose={() => {

      }}
    />
  );
}

export default SignUp;
