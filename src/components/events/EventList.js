import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventSelector from './fields/EventSelector';

const EventList = ({ itemsArr, title, admin = false }) => {
  const [showEventSelector, setShowEventSelector] = useState(false);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, itemsArr.length);
  }, [itemsArr]);

  const renderList = (itemsArr) => {
    return itemsArr.map((el, i) => {
      if (el.imageCover) {
        return (
          <div
            className="column"
            ref={(el) => (itemsRef.current[i] = el)}
            key={i}
          >
            <div className="ui segment">
              <img
                src={`http://127.0.0.1:3001/img/eventsCovers/${el.imageCover}`}
                alt="event_cover_image"
                style={{ width: '100%' }}
              />
              {admin && renderAdminBtns(el._id)}
            </div>
          </div>
        );
      }
      return (
        <div
          className="column"
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <div className="ui segment">
            <div
              style={{
                lineHeight: '300px',
                backgroundColor: 'grey',
                textAlign: 'center',
              }}
            >
              {el.name}
            </div>
            {admin && renderAdminBtns(el._id)}
          </div>
        </div>
      );
    });
  };

  const renderAdminBtns = (eventId) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Link to={`/events/${eventId}/edit`}>
          <i className="edit icon"></i>
        </Link>
        <Link to={`/events/${eventId}/delete`}>
          <i className="trash icon"></i>
        </Link>
      </div>
    );
  };

  const renderLink = () => {
    if (title === 'Events I Created') {
      return (
        <div>
          <Link to="/events/new" className="ui button primary">
            Create Event
          </Link>
        </div>
      );
    }
    return (
      <div>
        <button
          className="ui button primary"
          onClick={() => setShowEventSelector(!showEventSelector)}
        >
          Find Event
        </button>
        <EventSelector show={showEventSelector} />
      </div>
    );
  };

  if (itemsArr.length > 0) {
    return (
      <div>
        <div className="ui container">
          <h1>{title}</h1>
          {admin && renderLink()}
          <div className="ui three column grid">{renderList(itemsArr)}</div>
        </div>
      </div>
    );
  }
  return admin ? renderLink() : null;
};

export default EventList;
