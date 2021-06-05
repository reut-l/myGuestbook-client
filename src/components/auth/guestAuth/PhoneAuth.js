import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import {
  isValidPhoneNumber,
  parsePhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input';
import renderPhoneField from '../../utils/forms/renderPhoneField';
import { checkIsGuest } from '../../utils/utils';
import history from '../../../history';

const PhoneAuth = ({
  match: {
    params: { eventId },
  },
  handleSubmit,
  initialize,
}) => {
  const [alert, setAlert] = useState(null);

  const onSubmit = async (formValues) => {
    const isGuest = await checkIsGuest(eventId, formValues.phone);

    if (isGuest) {
      localStorage.setItem('eventsAsGuest', JSON.stringify(eventId));
      return history.push('/register');
    }

    const { phone } = formValues;
    const countryOfPhoneNumber = parsePhoneNumber(phone).country;
    const countryDialCode = getCountryCallingCode(countryOfPhoneNumber);
    initialize('guestAuthForm', { phone: `+${countryDialCode}` });

    return setAlert(
      "We did'nt find this number in the guests list. Please try with different phone number"
    );
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
      {alert && renderAlert()}
      <h5>Please provide the phone that you were invited with</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
        <Field
          name="phone"
          component={renderPhoneField}
          label="Phone"
          noValidate
        ></Field>
        <button className="ui button primary">Confirm</button>
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
  form: 'guestAuthForm',
  validate,
})(connect(null, { initialize })(PhoneAuth));
