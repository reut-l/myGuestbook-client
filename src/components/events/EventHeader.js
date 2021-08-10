import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchEvent, fetchMyEvent } from '../../actions';
import SearchGuests from '../posts/utils/SearchGuests';
import CreatePostBtn from '../posts/utils/CreatePostBtn';

const EventHeader = ({
  eventId,
  eventsUserCreated,
  event,
  fetchEvent,
  fetchMyEvent,
}) => {
  const [showSearchField, setShowSearchField] = useState(false);
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

  const toggleSearchField = () => {
    setShowSearchField(!showSearchField);
  };

  if (event) {
    const eventName = event.name;

    return (
      <div className="event-header">
        <div className="event-header-main">
          <h1>{eventName}</h1>
          <div className="btns-event-header">
            <CreatePostBtn eventId={eventId} />
            <FontAwesomeIcon
              icon="search"
              className="right-btn"
              onClick={() => toggleSearchField()}
            />
          </div>
        </div>
        {showSearchField && <SearchGuests eventId={eventId} />}
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const { eventId } = ownProps;

  return {
    eventsUserCreated: Object.keys(state.events.eventsAsCreator),
    event: state.events.all[eventId],
  };
};
export default connect(mapStateToProps, { fetchEvent, fetchMyEvent })(
  EventHeader
);
