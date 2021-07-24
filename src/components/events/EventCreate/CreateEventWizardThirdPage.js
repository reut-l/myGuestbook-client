import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderTextArea from '../../utils/forms/renderTextArea';

const CreateEventWizardThirdPage = ({
  handleSubmit,
  previousPage,
  submitting,
  invalid,
  pristine,
}) => {
  const disabled = pristine || submitting || invalid;

  return (
    <form onSubmit={handleSubmit} className="event-form-guests-phones">
      <div className="guests-phones-box">
        <label>Guests Phone Numbers</label>
        <Field
          name="guestsPhones"
          component={renderTextArea}
          label="You can copy-paste a list of phones..."
        />
      </div>
      <div className="form-navigation-container">
        <button
          type="button"
          className="prev-btn btn btn-outline"
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="submit"
          className={`next-btn btn btn-action ${disabled ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'createEventForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(CreateEventWizardThirdPage);
