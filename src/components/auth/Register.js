import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions';
import RegisterForm from './RegisterForm';

const Register = ({ signUp }) => {
  const onSubmit = (formValues) => {
    formValues.phone = formValues.phone.replace(/ /g, '');

    signUp(formValues);
  };
  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { signUp })(Register);