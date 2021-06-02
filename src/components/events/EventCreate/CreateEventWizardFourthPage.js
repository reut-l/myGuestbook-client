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
  change,
}) => {
  const [file, setFile] = useState('');

  useEffect(() => {
    change('createEvent', 'imageCover', file);
  }, [file]);

  const handleOnDrop = (newImageFile, onChange) => {
    const imageFile = {
      file: newImageFile[0],
      name: newImageFile[0].name,
      preview: URL.createObjectURL(newImageFile[0]),
      size: newImageFile[0].size,
    };

    setFile(imageFile);
  };

  const resetForm = () => setFile('');

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="imageCover"
        component={renderDropzone}
        type="file"
        imagefile={file}
        handleOnDrop={handleOnDrop}
      />
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          disabled={pristine || submitting}
          onClick={resetForm}
        >
          Clear Image
        </button>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>
          Submit
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
})(connect(null, { change })(CreateEventWizardFourthPage));
