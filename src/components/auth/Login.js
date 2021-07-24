import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import LoginForm from './LoginForm';

const Login = ({ login, location }) => {
  const { sourcePath } = location.state ? location.state : '/';

  const onSubmit = (formValues) => {
    login(formValues, sourcePath);
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { login })(Login);
