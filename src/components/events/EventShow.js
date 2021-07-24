import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EventHeader from './EventHeader';
import EventBody from './EventBody';
import { fetchEvent } from '../../actions';

const EventShow = ({
  match: {
    params: { eventId },
  },
  fetchEvent,
}) => {
  useEffect(() => {
    fetchEvent(eventId).then(() =>
      localStorage.setItem('currentEvent', JSON.stringify(eventId))
    );
  }, []);

  return (
    <div className="middle-container">
      <EventHeader eventId={eventId} />
      <EventBody eventId={eventId} />
    </div>
  );
};

export default connect(null, { fetchEvent })(EventShow);
