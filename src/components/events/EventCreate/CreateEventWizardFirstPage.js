import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from '../../utils/forms/renderField';

const CreateEventWizardFirstPage = ({
  handleSubmit,
  submitting,
  invalid,
  pristine,
}) => {
  const disabled = pristine || submitting || invalid;

  return (
    <form onSubmit={handleSubmit} className="create-event-form">
      <Field name="name" component={renderField} label="Event's Name" />
      <div>
        <button
          type="submit"
          disabled={disabled}
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
})(CreateEventWizardFirstPage);
