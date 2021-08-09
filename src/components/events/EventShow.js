import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import EventHeader from './EventHeader';
import EventBody from './EventBody';
import { fetchEvent } from '../../actions';
import ErrorMessage from '../utils/Error/ErrorMessage';
import Guidance from '../utils/Guidance';

const EventShow = ({
  match: {
    params: { eventId },
  },
  fetchEvent,
  posts,
  error,
}) => {
  const [eventFetched, setEventFetched] = useState(false);

  useEffect(() => {
    const asyncUseEffect = async () => {
      await fetchEvent(eventId);
      setEventFetched(true);
    };

    asyncUseEffect();
  }, [eventId, fetchEvent]);

  return (
    <div className="middle-container">
      <EventHeader eventId={eventId} />
      <EventBody eventId={eventId} />
      {error && <ErrorMessage error={error} />}
      {eventFetched && !posts && (
        <Guidance
          text="Be the first to create a page"
          icon="hand-pointer"
          animation="to-page-header"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { eventId },
    },
  } = ownProps;

  return {
    posts: state.posts.allByEvent[eventId]
      ? Object.values(state.posts.allByEvent[eventId])
      : null,
    error: state.errors.validation.showEvent,
  };
};

export default connect(mapStateToProps, { fetchEvent })(EventShow);
