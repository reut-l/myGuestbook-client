import React from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPwd } from '../../actions';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = ({ resetPwd, error }) => {
  const getToken = (path) => {
    const token = path.split('/')[2];
    return token;
  };

  const pathname = useLocation().pathname;
  const token = getToken(pathname);

  const onSubmit = (formValues) => {
    resetPwd(formValues, token);
  };

  return (
    <div className="middle-container">
      <ResetPasswordForm onSubmit={onSubmit} />
      {error && <div className="error-form error-reset-pwd">{error}</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.errors.validation.resetPwd };
};

export default connect(mapStateToProps, { resetPwd })(ResetPassword);
