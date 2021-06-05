import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import renderField from '../utils/forms/renderField';
import renderPhoneField from '../utils/forms/renderPhoneField';

class RegisterForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="name" component={renderField} label="Enter Name"></Field>
        <Field name="email" component={renderField} label="Enter Email"></Field>
        <Field
          name="password"
          component={renderField}
          label="Enter Password (8-16 characters, at least 1 number & 1 letter)"
        ></Field>
        <Field
          name="passwordConfirm"
          component={renderField}
          label="Confirm Password"
        ></Field>
        <Field
          name="phone"
          component={renderPhoneField}
          label="Phone"
          noValidate
        ></Field>
        <button className="ui button primary">Register</button>
      </form>
    );
  }
}

const validate = (formValues) => {
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
  }

  if (!formValues.phone) {
    errors.phone = 'Please enter your phone';
  } else if (!isValidPhoneNumber(formValues.phone)) {
    errors.phone = 'Please provide a valid phone number';
  }
  return errors;
};

export default reduxForm({ form: 'registerForm', validate })(RegisterForm);
