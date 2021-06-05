import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../utils/forms/renderField';

class LoginForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="email" component={renderField} label="Email"></Field>
        <Field name="password" component={renderField} label="Password"></Field>
        <button className="ui button primary">Log In</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

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

  return errors;
};

export default reduxForm({ form: 'loginForm', validate })(LoginForm);
