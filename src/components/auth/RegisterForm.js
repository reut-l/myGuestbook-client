import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderField from '../utils/forms/renderField';
import renderPhoneField from '../utils/forms/renderPhoneField';
import CodeForm from './guestAuth/CodeForm';
import { getCode } from '../utils/utils';

const RegisterForm = ({ onSubmit, handleSubmit, invalid, phoneNumber }) => {
  const [stageOneCompleted, setStageOneCompleted] = useState(false);
  const [stageTwoCompleted, setStageTwoCompleted] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const phoneFieldUnderlineRef = useRef();

  let phone = phoneNumber ? phoneNumber.replace(/ /g, '') : '';
  phone = phone.match(/^[0-9]/) ? '+' + phone : phone;

  const submit = (formValues) => {
    onSubmit(formValues);
  };
  const sendSMS = async () => {
    const smsSent = await getCode(phone);
    if (smsSent) setStageOneCompleted(true);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const underline = (fieldName, show) => {
    const underline = eval(`${fieldName}FieldUnderlineRef`).current;
    underline.style.transform = show ? 'scale(1)' : 'scale(0,1)';
  };

  const disabledSMSBtn = phone.length !== 13;
  const disabledSubmitBtn =
    (invalid && !stageTwoCompleted) || !stageOneCompleted;

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <div className={stageOneCompleted ? 'disabled' : ''}>
            <Field name="name" component={renderField} label="Name"></Field>
            <Field
              name="email"
              component={renderField}
              label="Email address"
            ></Field>

            <FontAwesomeIcon
              icon={passwordShown ? 'eye-slash' : 'eye'}
              className="eye-icon"
              onClick={togglePasswordVisiblity}
              opacity={0.7}
            />
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
            <Field
              name="phone"
              component={renderPhoneField}
              label="Phone"
              onPhoneFocus={() => underline('phone', true)}
              onPhoneBlur={() => underline('phone', false)}
              underlineRef={phoneFieldUnderlineRef}
            ></Field>

            <button
              className={`register-sms-btn btn-action ${
                disabledSMSBtn ? 'disabled' : ''
              }`}
              disabled={disabledSMSBtn}
              type="button"
              onClick={sendSMS}
            >
              Send SMS
            </button>
          </div>
          <button
            className={`submit-btn btn-action ${
              disabledSubmitBtn ? 'disabled' : ''
            } ${!stageOneCompleted || !stageTwoCompleted ? 'hided' : ''}`}
            disabled={disabledSubmitBtn}
          >
            Register
          </button>
        </form>
      </div>
      <div>
        <CodeForm
          stageOneCompleted={stageOneCompleted}
          setStageOneCompleted={setStageOneCompleted}
          stageTwoCompleted={stageTwoCompleted}
          setStageTwoCompleted={setStageTwoCompleted}
          origin="register"
        />
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
  } else if (
    formValues.passwordConfirm &&
    formValues.password &&
    formValues.password !== formValues.passwordConfirm
  ) {
    errors.passwordConfirm = "Passwords doesn't match";
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
