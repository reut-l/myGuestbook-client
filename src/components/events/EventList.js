import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import EventSelector from './fields/EventSelector';

const EventList = ({ itemsArr, title, admin = false }) => {
  // const [showEventSelector, setShowEventSelector] = useState(false);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, itemsArr.length);
  }, [itemsArr]);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const renderList = (itemsArr) => {
    return itemsArr.map((el, i) => {
      if (el.imageCover) {
        return (
          <Link to={`/events/${el._id}`}>
            <div
              ref={(el) => (itemsRef.current[i] = el)}
              key={i}
              className="grid-item"
            >
              <img
                src={`http://127.0.0.1:3001/img/eventsCovers/${el.imageCover}`}
                alt="event_cover_image"
              />
              {admin && renderAdminBtns(el._id)}
            </div>
          </Link>
        );
      }
      return (
        <Link to={`/events/${el._id}`}>
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="grid-item"
          >
            <table className="without-cover-photo">
              <tbody>
                <tr>
                  <td>{el.name}</td>
                </tr>
              </tbody>
            </table>
            {admin && renderAdminBtns(el._id)}
          </div>
        </Link>
      );
    });
  };

  const renderAdminBtns = (eventId) => {
    return (
      <div className="item-menu-dropdown">
        <button onClick={(e) => toggleMenu(e)}>
          <FontAwesomeIcon icon="ellipsis-h" className="menu-icon" />
        </button>
        <div className="item-menu-dropdown-content">
          <Link to={`/events/${eventId}/edit`}>
            <FontAwesomeIcon icon="cog" className="admin-btn settings-icon" />
            <span>Settings</span>
          </Link>
          <Link to={`/events/${eventId}/delete`}>
            <FontAwesomeIcon icon="trash" className="admin-btn delete-icon" />
            <span>Delete</span>
          </Link>
        </div>
      </div>
    );
  };

  if (itemsArr.length > 0) {
    return (
      <div>
        <h1 className="dashboard-title">{title}</h1>
        <div className="grid-container">{renderList(itemsArr)}</div>
      </div>
    );
  }
  return null;
};

export default EventList;
