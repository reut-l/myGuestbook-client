import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import RegisterWizardFirstPage from './RegisterWizardFirstPage';
import RegisterWizardSecondPage from './RegisterWizardSecondPage';
import { signUp } from '../../../actions';
import { checkIsGuest, getCode, verifyCode } from '../../utils/utils';
import history from '../../../history';

const RegisterWizardForm = ({ signUp, error }) => {
  const [page, setPage] = useState(1);
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
    // 1) If the user registering after sent from the event show page (clicking the create post btn) => Check if the phone number that the user inserted is in the event's guests phones list
    if (previousPathEventId) {
      const isGuest = await checkIsGuest(previousPathEventId, phone);
      if (!isGuest)
        throw new SubmissionError({
          phone:
            "We did'nt find this number in the guests list. Please try with a different phone number",
        });
    }

    // 2) Send a onetime code via an SMS to the phone number that was inserted
    const smsSent = await getCode(phone);
    if (smsSent) nextPage();
    nextPage();
  };

  const onSubmit = async (formValues) => {
    const code = formValues.code.join('');
    const phone = formValues.phone;

    // 1) Verify the code that the user inserted and by so completing the phone validation
    const verified = await verifyCode(code, phone);

    if (!verified)
      throw new SubmissionError({ _error: 'Wrong code. please try again' });

    // 2) If the user registering after sent from the event show page (and verified as a guest) => add this event to his attended events when creating the user in DB
    if (previousPath && previousPath.match(/^\/events\/[^/]+$/)) {
      formValues.eventsAsGuest = previousPathEventId;
      return signUp(formValues, `/events/${previousPathEventId}/posts/new`);
    }

    return signUp(formValues, '/');
  };

  return (
    <div className="middle-container auth-form-container">
      {error && <div className="error-form">{error}</div>}
      {page === 1 && (
        <RegisterWizardFirstPage
          onSubmitFirstPage={onSubmitFirstPage}
          OriginalPathEventId={previousPathEventId}
        />
      )}
      {!error & (page === 2) && (
        <RegisterWizardSecondPage onSubmit={onSubmit} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.errors.validation.signup };
};

export default connect(mapStateToProps, { signUp })(RegisterWizardForm);
