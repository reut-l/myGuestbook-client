import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EventHeader from './EventHeader';
import EventBody from './EventBody';
import { fetchEvent } from '../../actions';
import ErrorMessage from '../utils/Error/ErrorMessage';

const EventShow = ({
  match: {
    params: { eventId },
  },
  fetchEvent,
  error,
}) => {
  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId, fetchEvent]);

  return (
    <div className="middle-container">
      <EventHeader eventId={eventId} />
      <EventBody eventId={eventId} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.errors.validation.showEvent,
  };
};

export default connect(mapStateToProps, { fetchEvent })(EventShow);
