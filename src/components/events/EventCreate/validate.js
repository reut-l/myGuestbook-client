const validate = (values) => {
  const phoneRegex =
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})/;
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
  } else {
    const guestsPhonesStr = values.guestsPhones.trim();
    const phonesArr = guestsPhonesStr.split(/[\s,]+/);
    let invalidStrs = phonesArr.filter((el) => !el.match(phoneRegex));
    if (invalidStrs.length > 0) {
      invalidStrs = invalidStrs.join(',');
      errors.guestsPhones = `Invalid values. ${invalidStrs}`;
    }
  }
  return errors;
};

export default validate;
