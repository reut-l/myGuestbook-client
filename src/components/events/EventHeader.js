import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchEvent } from '../../actions';
import SearchGuests from '../posts/utils/SearchGuests';
import CreatePostBtn from '../posts/utils/CreatePostBtn';

const EventHeader = ({ eventId, event, fetchEvent }) => {
  const [showSearchField, setShowSearchField] = useState(false);

  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId, fetchEvent]);

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

  return { event: state.events.all[eventId] };
};
export default connect(mapStateToProps, { fetchEvent })(EventHeader);
