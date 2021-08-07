import React, { useEffect } from 'react';
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
  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId, fetchEvent]);

  return (
    <div className="middle-container">
      <EventHeader eventId={eventId} />
      <EventBody eventId={eventId} />
      {error && <ErrorMessage error={error} />}
      {posts.length === 0 && (
        <Guidance
          text="Be the first to create a page"
          icon="hand-pointer"
          animation="to-page-header"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts.postsOfCurrentEvent),
    error: state.errors.validation.showEvent,
  };
};

export default connect(mapStateToProps, { fetchEvent })(EventShow);
