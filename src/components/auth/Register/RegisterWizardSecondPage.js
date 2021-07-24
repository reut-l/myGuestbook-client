import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FieldArray, submit, reduxForm } from 'redux-form';
import validate from './validate';
import renderCodeFields from '../../utils/forms/renderCodeFields';

const RegisterWizardSecondPage = ({ handleSubmit, submitting, submit }) => {
  const [alert, setAlert] = useState(null);
  const inputsRef = useRef([]);

  const renderAlert = () => {
    return (
      <div>
        <p className="alert-warning">{alert}</p>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className={`code-form ${submitting ? 'disabled' : ''}`}>
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
        {alert && renderAlert()}
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
