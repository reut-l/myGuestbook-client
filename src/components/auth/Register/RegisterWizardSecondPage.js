import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FieldArray, submit, reduxForm } from 'redux-form';
import validate from './validate';
import renderCodeFields from '../../utils/forms/renderCodeFields';
import { getCode } from '../../utils/utils';

const renderError = (error) => {
  if (error) {
    return <div className="error-form error-register">{error}</div>;
  }
};

const RegisterWizardSecondPage = ({
  handleSubmit,
  submitting,
  submit,
  submitFailed,
  error,
  phone,
}) => {
  const [resendingCode, setResendingCode] = useState(false);
  const inputsRef = useRef([]);

  const resendCode = async () => {
    setResendingCode(true);
    const smsSent = await getCode(phone);
    if (smsSent) setResendingCode(false);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div
        className={`code-form ${submitting || resendingCode ? 'disabled' : ''}`}
      >
        {submitFailed && error && renderError(error)}
        <p>A One Time code has been sent to your phone.</p>
        <h3>Please Enter Code:</h3>
        <FieldArray
          name="code"
          component={renderCodeFields}
          label="Code"
          type="text"
          inputsRef={inputsRef}
          submit={submit}
        ></FieldArray>
        <p>Didn't receive the code?</p>
        <button type="button" className="resend-btn" onClick={resendCode}>
          Resend Code
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { phone: state.form.registerForm.values.phone };
};

export default connect(mapStateToProps, { submit })(
  reduxForm({
    form: 'registerForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
  })(RegisterWizardSecondPage)
);
