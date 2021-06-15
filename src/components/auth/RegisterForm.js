import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import renderField from '../utils/forms/renderField';
import renderPhoneField from '../utils/forms/renderPhoneField';
import CodeForm from './guestAuth/CodeForm';
import { getCode } from '../utils/utils';

const RegisterForm = ({ onSubmit, handleSubmit, invalid, phoneNumber }) => {
  const [stageOneCompleted, setStageOneCompleted] = useState(false);
  const [stageTwoCompleted, setStageTwoCompleted] = useState(false);

  let phone = phoneNumber ? phoneNumber.replace(/ /g, '') : '';
  phone = phone.match(/^[0-9]/) ? '+' + phone : phone;

  const submit = (formValues) => {
    onSubmit(formValues);
  };
  const sendSMS = async () => {
    const smsSent = await getCode(phone);
    if (smsSent) setStageOneCompleted(true);
  };

  const disabled = {
    opacity: '0.5',
    pointerEvents: 'none',
  };

  const style = stageOneCompleted && !stageTwoCompleted ? disabled : {};

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(submit)}
          className="ui form error"
          style={style}
        >
          <Field name="name" component={renderField} label="Enter Name"></Field>
          <Field
            name="email"
            component={renderField}
            label="Enter Email"
          ></Field>
          <Field
            name="password"
            component={renderField}
            label="Enter Password (8-16 characters, at least 1 number & 1 letter)"
          ></Field>
          <Field
            name="passwordConfirm"
            component={renderField}
            label="Confirm Password"
          ></Field>
          <Field
            name="phone"
            component={renderPhoneField}
            label="Phone"
          ></Field>
          <button
            className="ui button primary"
            disabled={phone.length !== 13}
            type="button"
            onClick={sendSMS}
          >
            Send SMS
          </button>
          <br />
          <button
            className="ui button primary"
            disabled={(invalid && !stageTwoCompleted) || !stageOneCompleted}
          >
            Register
          </button>
        </form>
      </div>
      <div>
        {stageOneCompleted && (
          <CodeForm
            setStageTwoCompleted={setStageTwoCompleted}
            origin="register"
          />
        )}
      </div>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = 'Please enter your name';
  }

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

  if (!formValues.passwordConfirm && !errors.password) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if (!formValues.phone) {
    errors.phone = 'Please enter your phone';
  } else if (!isValidPhoneNumber(formValues.phone)) {
    errors.phone = 'Please provide a valid phone number';
  }
  return errors;
};

const mapStateToProps = (state) => {
  const formValues = state.form.registerForm.values;
  return formValues
    ? {
        phoneNumber: formValues.phone,
      }
    : {};
};

const phoneInitialVal = localStorage.getItem('phoneNumber')
  ? JSON.parse(localStorage.getItem('phoneNumber'))
  : '+972';

export default reduxForm({
  form: 'registerForm',
  initialValues: { phone: phoneInitialVal },
  validate,
})(connect(mapStateToProps)(RegisterForm));
