import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderCodeFields from '../../utils/forms/renderCodeFields';
import { verifyCode } from '../../utils/utils';
import history from '../../../history';

// const CodeForm = ({ handleSubmit, code, eventId, origin }) => {
//   const [submitting, setSubmitting] = useState(false);
//   const [alert, setAlert] = useState(null);
//   const inputsRef = useRef([]);
//   const codeStr = code ? code.join('') : '';

//   const onSubmit = async (formValues) => {
//     setSubmitting(true);
//     const code = formValues.code.join('');
//     const phone = JSON.parse(localStorage.getItem('phoneNumber'));

//     const verified = await verifyCode(code, phone);
//     if (verified) {
//       if (origin === 'guestAuth') {
//         localStorage.setItem('eventsAsGuest', JSON.stringify(eventId));
//         return history.push('/register');
//       }

//       if (origin === 'register') {
//         setStageTwoCompleted(true);
//       }
//     }
//     setSubmitting(false);
//     return setAlert('Wrong code');
//   };

//   const renderAlert = () => {
//     return (
//       <div>
//         <p className="alert-warning">{alert}</p>
//       </div>
//     );
//   };

//   const disabledVerifyBtn =
//     codeStr === '' ||
//     codeStr.length !== 6 ||
//     !codeStr.match(/^[0-9]+$/) ||
//     submitting;

//   return (
//     <div
//       className={`code-container ${
//         !stageOneCompleted || (stageOneCompleted && stageTwoCompleted)
//           ? 'hided'
//           : ''
//       }`}
//     >
//       <button className="arrow-btn" onClick={() => setStageOneCompleted(false)}>
//         <FontAwesomeIcon icon="arrow-circle-up" />
//       </button>
//       <form className="code-form" onSubmit={handleSubmit(onSubmit)}>
//         <h3>Please Enter Code:</h3>
//         <FieldArray
//           name="code"
//           component={renderCodeFields}
//           label="Code"
//           type="text"
//           inputsRef={inputsRef}
//         ></FieldArray>
//         {alert && renderAlert()}
//         <p>Didn't receive the code?</p>
//         <button className="resend-btn" onClick={() => null}>
//           Resend Code
//         </button>
//         <button
//           className={`verify-btn btn btn-warning ${
//             disabledVerifyBtn ? 'disabled' : ''
//           }`}
//           variant="contained"
//           disabled={disabledVerifyBtn}
//         >
//           Verify
//         </button>
//       </form>
//     </div>
//   );
// };

// const validate = (formValues) => {
//   const errors = {};

//   if (!formValues.code || !formValues.code.length) {
//     errors.code = { _error: 'Please enter the code' };
//   } else {
//     formValues.code.forEach((insert) => {
//       if (insert !== '' && !insert.match(/^[0-9]+$/)) {
//         errors.code = { _error: 'Digits only' };
//       }
//     });
//   }
//   return errors;
// };

// const mapStateToProps = (state) => {
//   return { code: state.form.guestAuthSecondStepForm.values.code };
// };

// export default reduxForm({
//   form: 'codeConfirmationForm',
//   initialValues: { code: ['', '', '', '', '', ''] },
//   validate,
// })(connect(mapStateToProps)(CodeForm));

const CodeForm = ({
  handleSubmit,
  code,
  stageOneCompleted,
  stageTwoCompleted,
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
        <p className="alert-warning">{alert}</p>
      </div>
    );
  };

  const disabledVerifyBtn =
    codeStr === '' ||
    codeStr.length !== 6 ||
    !codeStr.match(/^[0-9]+$/) ||
    submitting;

  return (
    <div
      className={`code-container ${
        !stageOneCompleted || (stageOneCompleted && stageTwoCompleted)
          ? 'hided'
          : ''
      }`}
    >
      <button className="arrow-btn" onClick={() => setStageOneCompleted(false)}>
        <FontAwesomeIcon icon="arrow-circle-up" />
      </button>
      <form className="code-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Please Enter Code:</h3>
        <FieldArray
          name="code"
          component={renderCodeFields}
          label="Code"
          type="text"
          inputsRef={inputsRef}
        ></FieldArray>
        {alert && renderAlert()}
        <p>Didn't receive the code?</p>
        <button className="resend-btn" onClick={() => null}>
          Resend Code
        </button>
        <button
          className={`verify-btn btn btn-warning ${
            disabledVerifyBtn ? 'disabled' : ''
          }`}
          variant="contained"
          disabled={disabledVerifyBtn}
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
