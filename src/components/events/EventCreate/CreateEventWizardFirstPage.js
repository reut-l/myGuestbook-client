import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from '../../utils/forms/renderField';

const CreateEventWizardFirstPage = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <Field name="name" component={renderField} label="Event's Name" />
      <div>
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
})(CreateEventWizardFirstPage);
