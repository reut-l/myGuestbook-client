import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import {
  isValidPhoneNumber,
  parsePhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input';
import renderPhoneField from '../../utils/forms/renderPhoneField';
import { checkIsGuest, getCode } from '../../utils/utils';

const PhoneForm = ({
  eventId,
  handleSubmit,
  initialize,
  stageOneCompleted,
  setStageOneCompleted,
}) => {
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (formValues) => {
    setSubmitting(true);
    const isGuest = await checkIsGuest(eventId, formValues.phone);

    if (isGuest) {
      const smsSent = await getCode(formValues.phone);
      if (smsSent) {
        localStorage.setItem('phoneNumber', JSON.stringify(formValues.phone));
        setStageOneCompleted(true);
        setSubmitting(false);
      }
    } else {
      const { phone } = formValues;
      const countryOfPhoneNumber = parsePhoneNumber(phone).country;
      const countryDialCode = getCountryCallingCode(countryOfPhoneNumber);
      initialize('guestAuthForm', { phone: `+${countryDialCode}` });

      return setAlert(
        "We did'nt find this number in the guests list. Please try with different phone number"
      );
    }
  };

  const renderAlert = () => {
    return (
      <div>
        <h2>{alert}</h2>
      </div>
    );
  };

  const disabled = {
    opacity: '0.5',
    pointerEvents: 'none',
  };

  const style = stageOneCompleted ? disabled : {};
  return (
    <div>
      {alert && renderAlert()}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ui form error"
        style={style}
      >
        <h5>Please provide the phone that you were invited with</h5>
        <Field name="phone" component={renderPhoneField} label="Phone"></Field>
        <button className="ui button primary" disabled={submitting}>
          Send SMS
        </button>
      </form>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.phone) {
    errors.phone = 'Please enter your phone';
  } else if (!isValidPhoneNumber(formValues.phone)) {
    errors.phone = 'Please provide a valid phone number';
  }
  return errors;
};

export default reduxForm({
  form: 'guestAuthFirstStepForm',
  validate,
})(connect(null, { initialize })(PhoneForm));
