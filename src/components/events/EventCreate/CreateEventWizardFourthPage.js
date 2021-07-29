import React, { useState, useEffect } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validate';
import renderDropzone from '../../utils/forms/dropzone/renderDropzone';

const CreateEventWizardFourthPage = ({
  handleSubmit,
  pristine,
  previousPage,
  submitting,
  invalid,
  change,
}) => {
  const [file, setFile] = useState('');

  useEffect(() => {
    change('createEventForm', 'imageCover', file);
  }, [file, change]);

  const handleOnDrop = (newImageFile) => {
    const imgFile = newImageFile[0];
    if (!imgFile) return setFile('error');

    const imageFile = {
      file: imgFile,
      name: imgFile.name,
      preview: URL.createObjectURL(imgFile),
      size: imgFile.size,
    };

    setFile(imageFile);
  };

  const resetForm = () => setFile('');

  const disabled = pristine || submitting || invalid;

  return (
    <form onSubmit={handleSubmit} className="event-form-cover-image">
      <Field
        name="imageCover"
        component={renderDropzone}
        type="file"
        imagefile={file}
        handleOnDrop={handleOnDrop}
      />
      <div className="clear-btn-box">
        <button
          type="button"
          disabled={pristine || submitting}
          onClick={resetForm}
          className="btn btn-outline"
        >
          Clear Image
        </button>
      </div>
      <div className="form-navigation-container-submition">
        <button
          type="button"
          className="prev-btn btn btn-outline"
          onClick={previousPage}
        >
          Previous
        </button>
        <br />
        <button
          type="submit"
          className={`submit-btn btn btn-action ${disabled ? 'disabled' : ''}`}
        >
          Create Event
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
})(connect(null, { change })(CreateEventWizardFourthPage));
