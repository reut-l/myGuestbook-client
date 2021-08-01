import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../utils/forms/renderField';

const ForgotPasswordForm = ({
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

          <button
            className={`submit-btn btn-action ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
          >
            Reset Password
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

  return errors;
};

export default reduxForm({ form: 'forgotPwdForm', validate })(
  ForgotPasswordForm
);
