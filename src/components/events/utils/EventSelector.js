// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, initialize } from 'redux-form';
// import {
//   isValidPhoneNumber,
//   parsePhoneNumber,
//   getCountryCallingCode,
// } from 'react-phone-number-input';
// import renderPhoneField from '../../utils/forms/renderPhoneField';
// import {fetchMy}
// import history from '../../../history';

// const EventSelector = ({ show, handleSubmit, initialize }) => {
//   const [alert, setAlert] = useState(null);

//   const onSubmit = async (formValues) => {
//     const isGuest = await checkIsGuest(eventId, formValues.phone);

//     if (isGuest) {
//       localStorage.setItem('eventsAsGuest', JSON.stringify(eventId));
//       return history.push('/register');
//     }

//     const { phone } = formValues;
//     const countryOfPhoneNumber = parsePhoneNumber(phone).country;
//     const countryDialCode = getCountryCallingCode(countryOfPhoneNumber);
//     initialize('searchMeInEventsForm', { phone: `+${countryDialCode}` });

//     return setAlert("We didn't find events that you were in");
//   };

//   const renderAlert = () => {
//     return (
//       <div>
//         <h2>{alert}</h2>
//       </div>
//     );
//   };

//   const style = () => {
//     const display = show ? 'block' : 'none';
//     return { display };
//   };

//   return (
//     <div style={style()}>
//       {alert && renderAlert()}
//       <h5>Enter Phone</h5>
//       <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
//         <Field
//           name="phone"
//           component={renderPhoneField}
//           label="Phone"
//           noValidate
//         ></Field>
//         <button className="ui button primary">Confirm</button>
//       </form>
//     </div>
//   );
// };

// const validate = (formValues) => {
//   const errors = {};

//   if (!formValues.phone) {
//     errors.phone = 'Please enter your phone';
//   } else if (!isValidPhoneNumber(formValues.phone)) {
//     errors.phone = 'Please provide a valid phone number';
//   }
//   return errors;
// };

// export default reduxForm({
//   form: 'searchMeInEventsForm',
//   validate,
// })(connect(null, { initialize })(EventSelector));
