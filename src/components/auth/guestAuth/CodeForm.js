import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';
import renderCodeFields from '../../utils/forms/renderCodeFields';
import { verifyCode } from '../../utils/utils';
import history from '../../../history';

const CodeForm = ({
  handleSubmit,
  code,
  setStageOneCompleted,
  setStageTwoCompleted,
  eventId,
  origin,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  const inputsRef = useRef([]);
  const codeStr = code ? code.join('') : '';

  const onSubmit = async (formValues) => {
    setSubmitting(true);
    const code = formValues.code.join('');
    const phone = JSON.parse(localStorage.getItem('phoneNumber'));

    const verified = await verifyCode(code, phone);
    if (verified) {
      if (origin === 'guestAuth') {
        localStorage.setItem('eventsAsGuest', JSON.stringify(eventId));
        return history.push('/register');
      }

      if (origin === 'register') {
        setStageTwoCompleted(true);
      }
    }
    setSubmitting(false);
    return setAlert('Wrong code');
  };

  const renderAlert = () => {
    return (
      <div>
        <h2>{alert}</h2>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => setStageOneCompleted(false)}>
        <i className="arrow alternate circle up icon"></i>
      </button>
      <h3>Enter the code</h3>
      <p>
        A One Time Password has been sent to your phone number for verification
        purposes.
      </p>
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <FieldArray
          name="code"
          component={renderCodeFields}
          label="Code"
          type="text"
          inputsRef={inputsRef}
        ></FieldArray>
        {alert && renderAlert()}
        <div>Didn't receive the code?</div>
        <button className="ui button primary" onClick={() => null}>
          Resend Code
        </button>
        <button
          className="ui button red"
          variant="contained"
          disabled={
            codeStr === '' ||
            codeStr.length !== 6 ||
            !codeStr.match(/^[0-9]+$/) ||
            submitting
          }
        >
          Verify
        </button>
      </form>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.code || !formValues.code.length) {
    errors.code = { _error: 'Please enter the code' };
  } else {
    formValues.code.forEach((insert) => {
      if (insert !== '' && !insert.match(/^[0-9]+$/)) {
        errors.code = { _error: 'Digits only' };
      }
    });
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { code: state.form.guestAuthSecondStepForm.values.code };
};

export default reduxForm({
  form: 'guestAuthSecondStepForm',
  initialValues: { code: ['', '', '', '', '', ''] },
  validate,
})(connect(mapStateToProps)(CodeForm));
