import React from 'react';
import { connect } from 'react-redux';
import { forgotPwd } from '../../actions';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = ({ forgotPwd, forgotPwdSubmitted, error }) => {
  const onSubmit = async (formValues) => {
    await forgotPwd(formValues);
  };

  if (forgotPwdSubmitted === true) {
    return (
      <div className="middle-container">
        <div className="email-sent-msg">
          <p>A reset email was sent.</p>
          <p>Please check your email!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="middle-container">
      <ForgotPasswordForm onSubmit={onSubmit} />
      {error && <div className="error-form error-forgot-pwd">{error}</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    forgotPwdSubmitted: state.auth.forgotPwdSubmitted,
    error: state.errors.validation.forgotPwd,
  };
};

export default connect(mapStateToProps, { forgotPwd })(ForgotPassword);
