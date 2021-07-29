import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import LoginForm from './LoginForm';

const Login = ({ login, location, error }) => {
  const { previousPath } = location.state ? location.state : '/';

  const onSubmit = (formValues) => {
    login(formValues, previousPath);
  };

  return (
    <div className="middle-container">
      <LoginForm onSubmit={onSubmit} />
      {error && <div className="error-form error-login">{error}</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.errors.validation.login };
};

export default connect(mapStateToProps, { login })(Login);
