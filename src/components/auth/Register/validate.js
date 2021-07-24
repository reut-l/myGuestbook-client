import { isValidPhoneNumber } from 'react-phone-number-input';

const validate = (formValues) => {
  const correctPhone = (phone) => {
    let correctedPhone = phone.replace(/ /g, '');
    correctedPhone = correctedPhone.match(/^[0-9]/)
      ? '+' + correctedPhone
      : correctedPhone;

    return correctedPhone;
  };

  formValues.phone = formValues.phone ? correctPhone(formValues.phone) : null;

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

export default validate;
