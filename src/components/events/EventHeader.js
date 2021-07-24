import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchEvent } from '../../actions';
import SearchGuests from '../posts/utils/SearchGuests';
import CreatePostBtn from '../posts/utils/CreatePostBtn';

const EventHeader = ({ eventId, currentEvent, fetchEvent }) => {
  const [showSearchField, setShowSearchField] = useState(false);

  useEffect(() => {
    fetchEvent(eventId);
  }, []);

  const toggleSearchField = () => {
    setShowSearchField(!showSearchField);
  };

  if (currentEvent) {
    const eventName = currentEvent.name;

    return (
      <div className="event-header">
        <div className="main-event-header">
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

const mapStateToProps = (state) => {
  return { currentEvent: state.events.currentEvent };
};
export default connect(mapStateToProps, { fetchEvent })(EventHeader);
