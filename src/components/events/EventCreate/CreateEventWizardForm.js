import React from 'react';
import { connect } from 'react-redux';
import WizardForm from '../../utils/forms/WizardForm';
import CreateEventWizardFirstPage from './CreateEventWizardFirstPage';
import CreateEventWizardSecondPage from './CreateEventWizardSecondPage';
import CreateEventWizardThirdPage from './CreateEventWizardThirdPage';
import CreateEventWizardFourthPage from './CreateEventWizardFourthPage';
import { createEvent } from '../../../actions';

const CreateEventWizardForm = ({ createEvent }) => {
  const onSubmit = (formValues) => {
    // Convert the free text of the list of phones to and array
    if (formValues.guestsPhones) {
      const guestsPhonesStr = formValues.guestsPhones.trim();
      const guestsPhonesArr = guestsPhonesStr.split(/[\s,]+/);
      formValues.guestsPhones = guestsPhonesArr;
    }

    createEvent(formValues);
  };
  return (
    <div className="middle-container">
      <WizardForm onSubmit={onSubmit}>
        <CreateEventWizardFirstPage />
        <CreateEventWizardSecondPage />
        <CreateEventWizardThirdPage />
        <CreateEventWizardFourthPage />
      </WizardForm>
    </div>
  );
};

export default connect(null, { createEvent })(CreateEventWizardForm);
