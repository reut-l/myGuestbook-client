import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import RegisterWizardFirstPage from './RegisterWizardFirstPage';
import RegisterWizardSecondPage from './RegisterWizardSecondPage';
import { signUp } from '../../../actions';
import { checkIsGuest, getCode, verifyCode } from '../../utils/utils';
import history from '../../../history';

const RegisterWizardForm = ({ signUp }) => {
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState(null);
  const [previousPath, setPreviousPath] = useState(null);
  const [previousPathEventId, setPreviousPathEventId] = useState(null);

  useEffect(() => {
    if (history.location.state)
      setPreviousPath(history.location.state.previousPath);
  }, []);

  useEffect(() => {
    if (previousPath && previousPath.match(/^\/events\/[^/]+$/)) {
      const previousPathEvent = getEvent(previousPath);
      setPreviousPathEventId(previousPathEvent);
    }
  }, [previousPath]);

  const getEvent = (path) => {
    const pathArr = path.split('/');
    return pathArr[2];
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const onSubmitFirstPage = async ({ phone }) => {
    if (previousPathEventId) {
      const isGuest = await checkIsGuest(previousPathEventId, phone);
      if (!isGuest)
        // return setAlert(
        //   "We did'nt find this number in the guests list. Please try with a different phone number"
        // );
        throw new SubmissionError({
          phone:
            "We did'nt find this number in the guests list. Please try with a different phone number",
        });
    }

    const smsSent = await getCode(phone);
    if (smsSent) nextPage();
    nextPage();
  };

  const onSubmit = async (formValues) => {
    const code = formValues.code.join('');
    const phone = formValues.phone;
    console.log(code, phone);
    const verified = await verifyCode(code, phone);

    if (verified) {
      console.log('success');
      if (previousPath && previousPath.match(/^\/events\/[^/]+$/)) {
        formValues.eventsAsGuest = previousPathEventId;
        return signUp(formValues, `/events/${previousPathEventId}/posts/new`);
      }

      return signUp(formValues, '/');
    }

    return setAlert('Wrong code, please try again');
  };

  const renderAlert = () => {
    return (
      <div className="alert-warning">
        <p>{alert}</p>
      </div>
    );
  };

  return (
    <div className="auth-form-container">
      {alert && renderAlert()}
      {page === 1 && (
        <RegisterWizardFirstPage
          onSubmitFirstPage={onSubmitFirstPage}
          OriginalPathEventId={previousPathEventId}
        />
      )}
      {page === 2 && <RegisterWizardSecondPage onSubmit={onSubmit} />}
    </div>
  );
};

export default connect(null, { signUp })(RegisterWizardForm);
