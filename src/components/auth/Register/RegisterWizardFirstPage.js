import React, { useState, useRef } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validate from './validate';
import renderField from '../../utils/forms/renderField';
import renderPhoneField from '../../utils/forms/renderPhoneField';

const CreateEventWizardFirstPage = ({
  handleSubmit,
  onSubmitFirstPage,
  submitting,
  invalid,
  pristine,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const phoneFieldUnderlineRef = useRef();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const refsNames = {
    phone: phoneFieldUnderlineRef,
  };

  const underline = (fieldName, show) => {
    const underline = refsNames[fieldName].current;
    underline.style.transform = show ? 'scale(1)' : 'scale(0,1)';
  };

  const onPhoneBlur = () => {
    underline('phone', false);
    setPhoneTouched(true);
  };

  const disabled = pristine || submitting || invalid;

  return (
    <form onSubmit={handleSubmit(onSubmitFirstPage)} className="auth-form">
      <div className="first-box">
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
        <Field
          name="phone"
          component={renderPhoneField}
          label="Phone"
          onPhoneFocus={() => underline('phone', true)}
          onPhoneBlur={() => onPhoneBlur()}
          underlineRef={phoneFieldUnderlineRef}
          touched={phoneTouched}
        ></Field>
      </div>
      <div>
        <button
          type="submit"
          disabled={disabled}
          className={`next-btn btn btn-action ${disabled ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'registerForm',
  initialValues: { code: ['', '', '', '', '', ''] },
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(CreateEventWizardFirstPage);
