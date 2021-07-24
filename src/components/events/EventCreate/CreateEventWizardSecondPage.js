import React, { useRef } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderDatePicker from '../../utils/forms/renderDatePicker';
import renderLocationSearch from '../../utils/forms/renderLocationSearch';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const CreateEventWizardSecondPage = ({
  handleSubmit,
  previousPage,
  submitting,
  invalid,
  pristine,
}) => {
  const dateFieldUnderlineRef = useRef(null);
  const venueFieldUnderlineRef = useRef(null);

  const underline = (fieldName, show) => {
    const underline = eval(`${fieldName}FieldUnderlineRef`).current;
    underline.style.transform = show ? 'scale(1)' : 'scale(0,1)';
  };

  const onDateBlur = () => {
    underline('date', false);
  };

  const onPlaceBlur = () => {
    underline('venue', false);
  };

  const disabled = pristine || submitting || invalid;

  return (
    <form onSubmit={handleSubmit} className="create-event-form">
      <label>When?</label>
      <Field
        name="date"
        component={renderDatePicker}
        placeholder="Select a date..."
        onDateFocus={() => underline('date', true)}
        onDateBlur={() => onDateBlur()}
        underlineRef={dateFieldUnderlineRef}
      />
      <label>Time of Day</label>
      <div className="radio-box">
        <label className="radio-label">
          <Field
            name="timeOfDay"
            component="input"
            type="radio"
            value="morning"
          />{' '}
          <p> Morning</p>
        </label>
        <br />
        <label className="radio-label">
          <Field
            name="timeOfDay"
            component="input"
            type="radio"
            value="afternoon"
          />{' '}
          <p> Afternoon</p>
        </label>
        <br />
        <label className="radio-label">
          <Field
            name="timeOfDay"
            component="input"
            type="radio"
            value="evening"
          />{' '}
          <p>Evening</p>
        </label>
        <Field name="timeOfDay" component={renderError} />
      </div>
      <label>Where?</label>
      <Field
        name="venue"
        component={renderLocationSearch}
        placeholder="Venue or Address"
        onPlaceFocus={() => underline('venue', true)}
        onPlaceBlur={() => onPlaceBlur()}
        underlineRef={venueFieldUnderlineRef}
      />
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
})(CreateEventWizardSecondPage);
