import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMyEvent, editEvent } from '../../actions';
import renderField from '../utils/forms/renderField';
import renderDatePicker from '../utils/forms/renderDatePicker';
import LocationSearchInput from '../utils/forms/LocationSearchInput';
import renderTextArea from '../utils/forms/renderTextArea';
import renderDropzone from '../utils/forms/dropzone/renderDropzone';
import validate from './EventCreate/validate';

const EventEdit = ({
  match: {
    params: { eventId },
  },
  event,
  handleSubmit,
  invalid,
  change,
  pristine,
  submitting,
  fetchMyEvent,
  initialValues,
  editEvent,
}) => {
  const [file, setFile] = useState('');
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    fetchMyEvent(eventId);
  }, []);

  useEffect(() => {
    change('editEventForm', 'imageCover', file);
  }, [file]);

  const handleOnDrop = (newImageFile) => {
    const imageFile = {
      file: newImageFile[0],
      name: newImageFile[0].name,
      preview: URL.createObjectURL(newImageFile[0]),
      size: newImageFile[0].size,
    };

    setFile(imageFile);
  };

  const submit = (formValues) => {
    if (formValues.guestsPhones) {
      const guestsPhonesStr = formValues.guestsPhones.trim();
      const guestsPhonesArr = guestsPhonesStr.split(/[\s,]+/);
      formValues.guestsPhones = guestsPhonesArr;
    }

    editEvent(formValues, eventId);
  };

  const renderError = ({ meta: { touched, error } }) =>
    touched && error ? <span>{error}</span> : false;

  const resetForm = () => setFile('');
  if (event) {
    return (
      <div>
        <div>
          <Link
            to={`/events/${event._id}/edit/uploadImages`}
            className="ui primary button"
          >
            Upload Event Pictures
          </Link>
        </div>
        <form onSubmit={handleSubmit(submit)} className="ui form">
          {initialValues.imageCover && (
            <>
              <img
                src={`http://127.0.0.1:3001/img/eventsCovers/${initialValues.imageCover}`}
                alt="event_cover"
              />
              <button
                type="button"
                disabled={showDropzone}
                onClick={() => setShowDropzone(true)}
              >
                Change Image
              </button>
            </>
          )}
          {(showDropzone || !initialValues.imageCover) && (
            <div>
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
                {initialValues.imageCover && (
                  <button type="button" onClick={() => setShowDropzone(false)}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
          <Field name="name" component={renderField} label="Event's Name" />
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
          <LocationSearchInput
            initialValue={initialValues.venue}
            form="editEventForm"
          />
          <Field name="venue" component={renderError} />
          <label>Guests Phone Numbers</label>
          <Field
            name="guestsPhones"
            component={renderTextArea}
            label="You can copy-paste a list of phones..."
          />
          <button disabled={invalid}>Save</button>
          <Link
            to={`/events/${event._id}/delete`}
            className="ui button negative"
          >
            Delete Event
          </Link>
        </form>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    event: state.events.currentEvent,
    initialValues: _.pick(
      state.events.currentEvent,
      'name',
      'date',
      'timeOfDay',
      'venue',
      'imageCover',
      'guestsPhones'
    ),
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'editEventForm',
    validate,
    enableReinitialize: true,
  })(connect(null, { fetchMyEvent, editEvent, change })(EventEdit))
);
