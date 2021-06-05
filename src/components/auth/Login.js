import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import LoginForm from './LoginForm';

const Login = ({ login, fetchNewEvents }) => {
  const onSubmit = (formValues) => {
    login(formValues);
  };
  return (
    <div>
      <h2>Log In</h2>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { login })(Login);
