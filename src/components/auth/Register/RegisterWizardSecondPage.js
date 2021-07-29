import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { FieldArray, submit, reduxForm } from 'redux-form';
import validate from './validate';
import renderCodeFields from '../../utils/forms/renderCodeFields';

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
}) => {
  const inputsRef = useRef([]);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className={`code-form ${submitting ? 'disabled' : ''}`}>
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
        <button type="button" className="resend-btn" onClick={() => null}>
          Resend Code
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { code: state.form.registerForm.values.code };
};

export default reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(connect(mapStateToProps, { submit })(RegisterWizardSecondPage));
