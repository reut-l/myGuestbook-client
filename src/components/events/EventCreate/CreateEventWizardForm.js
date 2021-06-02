import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import WizardForm from '../../utils/forms/WizardForm';
import CreateEventWizardFirstPage from './CreateEventWizardFirstPage';
import CreateEventWizardSecondPage from './CreateEventWizardSecondPage';
import CreateEventWizardThirdPage from './CreateEventWizardThirdPage';
import CreateEventWizardFourthPage from './CreateEventWizardFourthPage';
import { createEvent } from '../../../actions';

const CreateEventWizardForm = ({ createEvent }) => {
  const onSubmit = (formValues) => {
    if (formValues.guestsPhones) {
      const guestsPhonesStr = formValues.guestsPhones.trim();
      const guestsPhonesArr = guestsPhonesStr.split(/[\s,]+/);
      formValues.guestsPhones = guestsPhonesArr;
    }

    createEvent(formValues);
  };
  return (
    <WizardForm onSubmit={onSubmit}>
      <CreateEventWizardFirstPage />
      <CreateEventWizardSecondPage />
      <CreateEventWizardThirdPage />
      <CreateEventWizardFourthPage />
    </WizardForm>
  );
};

export default connect(null, { createEvent })(CreateEventWizardForm);
