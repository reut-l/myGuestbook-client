import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderField from '../utils/forms/renderField';

const ResetPasswordForm = ({
  onSubmit,
  handleSubmit,
  pristine,
  submitting,
  invalid,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const submit = (formValues) => {
    onSubmit(formValues);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const disabled = pristine || submitting || invalid;
  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit(submit)} className="auth-form">
        <div className="first-box">
          <div className="action-msg">
            <p>Enter a new password:</p>
          </div>
          <FontAwesomeIcon
            icon={passwordShown ? 'eye-slash' : 'eye'}
            className="eye-icon"
            onClick={togglePasswordVisiblity}
            opacity={0.7}
          />
        </div>
        <div className="second-box">
          <Field
            name="password"
            component={renderField}
            label="Password"
            type={passwordShown ? 'text' : 'password'}
            notes="8-16 characters, at least one number & one letter"
          ></Field>
          <Field
            name="passwordConfirm"
            component={renderField}
            label="Confirm Password"
            type="password"
          ></Field>
          <button
            className={`submit-btn btn-action ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.password) {
    errors.password = 'Please enter a password';
  } else if (
    !formValues.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)
  ) {
    errors.password = '8-16 characters, at least one number & one letter';
  }

  if (!formValues.passwordConfirm && !errors.password) {
    errors.passwordConfirm = 'Please confirm password';
  } else if (
    formValues.passwordConfirm &&
    formValues.password &&
    formValues.password !== formValues.passwordConfirm
  ) {
    errors.passwordConfirm = "Passwords doesn't match";
  }

  return errors;
};

export default reduxForm({ form: 'resetPwdForm', validate })(ResetPasswordForm);
