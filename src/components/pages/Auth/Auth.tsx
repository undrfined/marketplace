import React from 'react';
import { Formik, FormikHelpers } from 'formik';

import { NavLink, useNavigate } from 'react-router-dom';
import LoginHero from '../../../assets/images/LoginHero.jpeg';

import styles from './Auth.module.scss';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

type StringKey<T extends Record<string, any>> = keyof T extends string
  ? keyof T
  : never;

type InputType<T extends string> = {
  type: string;
  name: T;
  placeholder: string;
};

type OwnProps<T extends Record<string, string>> = {
  validationSchema: any;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;

  initialValues: T;
  inputs: (InputType<StringKey<T>> | InputType<StringKey<T>>[])[];

  headerText: string;
  headerDescription: string;
  error?: string;
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkNavigation: string;
};

function Auth<T extends Record<string, string>>({
  validationSchema,
  onSubmit,
  initialValues,
  inputs,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkNavigation,
  headerText,
  headerDescription,
  error,
}: OwnProps<T>) {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.heroImageWrapper}>
        <img src={LoginHero} alt="Login hero" className={styles.heroImage} />
      </div>
      <div className={styles.formWrapper}>
        <Button
          variant="icon-translucent"
          className={styles.closeButton}
          onClick={() => navigate('/')}
          buttonSize="small"
        >
          <i className="icon-close" />
        </Button>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            const renderInput = (input: InputType<StringKey<T>>) => (
              <Input
                key={input.name}
                type={input.type}
                name={input.name}
                error={touched[input.name] && (errors[input.name] as string)}
                className={styles.formInput}
                placeholder={input.placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[input.name]}
              />
            );

            return (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.header}>{headerText}</h1>
                <div className={styles.text}>{headerDescription}</div>

                {inputs.map((input) => {
                  if (Array.isArray(input)) {
                    return (
                      <div className={styles.rowInputs}>
                        {input.map((i) => renderInput(i))}
                      </div>
                    );
                  }

                  return renderInput(input);
                })}

                {error && <div className={styles.error}>{error}</div>}

                <Button
                  type="submit"
                  className={styles.formButton}
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {buttonText}
                </Button>
              </form>
            );
          }}
        </Formik>

        <div className={styles.footer}>
          {footerText}
          <NavLink to={footerLinkNavigation} className={styles.linkButton}>
            {footerLinkText}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Auth;
