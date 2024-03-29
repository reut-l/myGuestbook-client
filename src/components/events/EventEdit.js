import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, change, reset } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMyEvent, editEvent } from '../../actions';
import renderField from '../utils/forms/renderField';
import renderDatePicker from '../utils/forms/renderDatePicker';
import renderLocationSearch from '../utils/forms/renderLocationSearch';
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
  pristine,
  submitting,
  change,
  reset,
  fetchMyEvent,
  initialValues,
  editEvent,
}) => {
  const [file, setFile] = useState('');
  const [showDropzone, setShowDropzone] = useState(false);
  const [editEventDisabled, setEditEventDisabled] = useState(true);

  const editEventAreaRef = useRef(null);
  const dateFieldUnderlineRef = useRef(null);
  const venueFieldUnderlineRef = useRef(null);

  useEffect(() => {
    fetchMyEvent(eventId);
  }, [eventId, fetchMyEvent]);

  useEffect(() => {
    change('editEventForm', 'imageCover', file);
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

  const submit = (formValues) => {
    // Convert free text of phone numbers list to an array
    if (formValues.guestsPhones) {
      const guestsPhonesStr = formValues.guestsPhones.trim();
      const guestsPhonesArr = guestsPhonesStr.split(/[\s,]+/);
      formValues.guestsPhones = guestsPhonesArr;
    }

    editEvent(formValues, eventId);
  };

  const resetFileField = () => setFile('');

  const resetEditArea = () => {
    setEditEventDisabled(true);
    setShowDropzone(false);
    reset('editEventForm');
  };

  const toggleEditEventMode = (e) => {
    const editAreaElement = editEventAreaRef.current;
    const targetClassName = e.target.className;

    if (targetClassName.includes('cancel-btn')) {
      resetEditArea();
    } else if (editAreaElement.contains(e.target)) {
      setEditEventDisabled(false);
    } else {
      resetEditArea();
    }
  };

  const refsNames = {
    date: dateFieldUnderlineRef,
    venue: venueFieldUnderlineRef,
  };

  const underline = (fieldName, show) => {
    const underline = refsNames[fieldName].current;
    underline.style.transform = show ? 'scale(1)' : 'scale(0,1)';
  };

  const onDateBlur = () => {
    underline('date', false);
  };

  const onPlaceBlur = () => {
    underline('venue', false);
  };

  if (event) {
    return (
      <div className="middle-container" onClick={(e) => toggleEditEventMode(e)}>
        <div className="upload-event-pictures-box">
          <Link
            to={`/events/${event._id}/edit/uploadImages`}
            className="btn btn-action upload-event-pictures-btn"
          >
            Upload Event Pictures
          </Link>
        </div>
        <div className="edit-event-title">
          <h1>Edit Event</h1>
        </div>
        <div ref={editEventAreaRef}>
          <form
            onSubmit={handleSubmit(submit)}
            className={`edit-event-form ${editEventDisabled ? 'disabled' : ''}`}
          >
            {initialValues.imageCover && (
              <div className="cover-image-preview-box">
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/img/eventsCovers/${initialValues.imageCover}`}
                  alt="event_cover"
                />
                <button
                  type="button"
                  disabled={showDropzone}
                  onClick={() => setShowDropzone(true)}
                  className="btn btn-outline"
                >
                  Change Image
                </button>
              </div>
            )}
            {(showDropzone || !initialValues.imageCover) && (
              <div className="event-form-cover-image">
                <Field
                  name="imageCover"
                  component={renderDropzone}
                  type="file"
                  imagefile={file}
                  handleOnDrop={handleOnDrop}
                />
                <div className="btns-box">
                  <button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={resetFileField}
                    className="btn btn-outline"
                  >
                    Clear Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDropzone(false)}
                    className="btn btn-warning"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <Field name="name" component={renderField} label="Event's Name" />
            <Field
              name="date"
              component={renderDatePicker}
              onDateFocus={() => underline('date', true)}
              onDateBlur={() => onDateBlur()}
              underlineRef={dateFieldUnderlineRef}
            />
            <div>
              <div className="radio-box">
                <label className="radio-label">
                  <Field
                    name="timeOfDay"
                    component="input"
                    type="radio"
                    value="morning"
                  />{' '}
                  <p>Morning</p>
                </label>
                <br />
                <label className="radio-label">
                  <Field
                    name="timeOfDay"
                    component="input"
                    type="radio"
                    value="afternoon"
                  />{' '}
                  <p>Afternoon</p>
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
              </div>
            </div>
            <Field
              name="venue"
              component={renderLocationSearch}
              onPlaceFocus={() => underline('venue', true)}
              onPlaceBlur={() => onPlaceBlur()}
              underlineRef={venueFieldUnderlineRef}
            />
            <div className="edit-form-label">
              <label>Guests Phone Numbers</label>
            </div>
            <Field
              name="guestsPhones"
              component={renderTextArea}
              label="You can copy-paste a list of phones..."
            />
            <div className="btns-box">
              <button
                disabled={pristine || invalid || submitting}
                className="btn btn-action"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline cancel-btn"
                onClick={(e) => toggleEditEventMode(e)}
              >
                Cancel
              </button>
              <br />
              <Link
                to={`/events/${event._id}/delete`}
                className="btn btn-warning"
              >
                Delete Event
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { eventId },
    },
  } = ownProps;

  return {
    event: state.events.all[eventId],
    initialValues: _.pick(
      state.events.all[eventId],
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
  })(connect(null, { fetchMyEvent, editEvent, change, reset })(EventEdit))
);
