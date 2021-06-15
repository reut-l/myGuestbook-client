import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderDatePicker from '../../utils/forms/renderDatePicker';
import LocationSearchInput from '../../utils/forms/LocationSearchInput';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const CreateEventWizardSecondPage = ({ handleSubmit, previousPage }) => {
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <label>When?</label>
      <Field name="date" component={renderDatePicker} />
      <div>
        <label>Time of Day</label>
        <div>
          <label>
            <Field
              name="timeOfDay"
              component="input"
              type="radio"
              value="morning"
            />{' '}
            Morning
          </label>
          <label>
            <Field
              name="timeOfDay"
              component="input"
              type="radio"
              value="afternoon"
            />{' '}
            Afternoon
          </label>
          <label>
            <Field
              name="timeOfDay"
              component="input"
              type="radio"
              value="evening"
            />{' '}
            Evening
          </label>
          <Field name="timeOfDay" component={renderError} />
        </div>
      </div>
      <label>Where?</label>
      <LocationSearchInput form="createEventForm" />
      <Field name="venue" component={renderError} />
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
  form: 'createEventForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(CreateEventWizardSecondPage);
