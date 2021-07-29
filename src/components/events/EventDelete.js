import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchEvent, deleteEvent } from '../../actions';

const EventDelete = ({
  event,
  fetchEvent,
  deleteEvent,
  match: {
    params: { eventId },
  },
}) => {
  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId, fetchEvent]);

  // Action buttens render function
  const renderActions = () => {
    return (
      <div className="actions-btns">
        <button
          onClick={() => deleteEvent(eventId)}
          className="btn btn-warning"
        >
          Delete
        </button>
        <Link to="/" className="btn btn-outline">
          Cancel
        </Link>
      </div>
    );
  };

  const renderContent = () => {
    if (!event) {
      return 'Are you sure you want to delete this event?';
    }

    return `Are you sure you want to delete the event with title: ${event.name}?`;
  };

  return (
    <Modal
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push('/')}
    />
  );
};
const mapStateToProps = (state, ownProps) => {
  return { event: state.events.eventsAsCreator[ownProps.match.params.eventId] };
};

export default connect(mapStateToProps, { fetchEvent, deleteEvent })(
  EventDelete
);
