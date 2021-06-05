import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderTextArea from '../../utils/forms/renderTextArea';

const CreateEventWizardThirdPage = ({ handleSubmit, previousPage }) => {
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <div>
        <label>Guests Phone Numbers</label>
        <div>
          <Field
            name="guestsPhones"
            component={renderTextArea}
            label="You can copy-paste a list of phones..."
          />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'createEvent',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(CreateEventWizardThirdPage);
