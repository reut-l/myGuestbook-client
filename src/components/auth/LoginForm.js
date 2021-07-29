import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../utils/forms/renderField';

const LoginForm = ({
  onSubmit,
  handleSubmit,
  pristine,
  submitting,
  invalid,
}) => {
  const submit = (formValues) => {
    onSubmit(formValues);
  };

  const disabled = pristine || submitting || invalid;

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit(submit)} className="auth-form">
        <div className="first-box">
          <Field name="email" component={renderField} label="Email"></Field>
          <Field
            name="password"
            component={renderField}
            label="Password"
            type="password"
          ></Field>
          <button
            className={`submit-btn btn-action ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Please enter your email';
  }

  if (!formValues.password) {
    errors.password = 'Please enter a password';
  } else if (
    !formValues.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)
  ) {
    errors.password = '8-16 characters, at least one number & one letter';
  }

  return errors;
};

export default reduxForm({ form: 'loginForm', validate })(LoginForm);
