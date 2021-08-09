import { isValidPhoneNumber } from 'react-phone-number-input';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.date) {
    errors.date = 'Required';
  }
  if (!values.timeOfDay) {
    errors.timeOfDay = 'Required';
  }
  if (!values.venue) {
    errors.venue = 'Required';
  }
  if (!values.guestsPhones) {
    errors.guestsPhones = 'Required';
  } else if (!Array.isArray(values.guestsPhones)) {
    // Convert the free text phones list to an array
    const guestsPhonesStr = values.guestsPhones.trim();
    const phonesArr = guestsPhonesStr.split(/[\s,]+/);

    let invalidStrs = phonesArr.filter((el) => !isValidPhoneNumber(el));
    if (invalidStrs.length > 0) {
      invalidStrs = invalidStrs.join(',');
      errors.guestsPhones = `Invalid values. ${invalidStrs}`;
    }
  }
  if (values.imageCover === 'error') {
    errors.imageCover = 'only JPG/JPEG file types';
  }
  return errors;
};

export default validate;
