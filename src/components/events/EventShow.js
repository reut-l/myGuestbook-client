import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import EventHeader from './EventHeader';
import EventBody from './EventBody';
import { fetchEvent, fetchMyEvent } from '../../actions';
import ErrorMessage from '../utils/Error/ErrorMessage';
import Guidance from '../utils/Guidance';

const EventShow = ({
  match: {
    params: { eventId },
  },
  eventsUserCreated,
  posts,
  fetchEvent,
  fetchMyEvent,
  error,
}) => {
  const [eventFetched, setEventFetched] = useState(false);

  useEffect(() => {
    const asyncUseEffect = async () => {
      if (!eventsUserCreated.includes(eventId)) {
        await fetchEvent(eventId);
      } else {
        await fetchMyEvent(eventId);
      }
      setEventFetched(true);
    };

    if (!eventFetched) asyncUseEffect();
  }, [eventId, eventsUserCreated, fetchEvent, fetchMyEvent, eventFetched]);

  return (
    <div className="middle-container">
      <EventHeader eventId={eventId} />
      <EventBody eventId={eventId} />
      {error && <ErrorMessage error={error} />}
      {eventFetched && posts.length === 0 && (
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
    eventsUserCreated: Object.keys(state.events.eventsAsCreator),
    posts: state.posts.allByEvent[eventId]
      ? Object.values(state.posts.allByEvent[eventId])
      : null,
    error: state.errors.validation.showEvent,
  };
};

export default connect(mapStateToProps, { fetchEvent, fetchMyEvent })(
  EventShow
);
