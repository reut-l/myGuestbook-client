import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchEvent, deleteEvent } from '../../actions';

class EventDelete extends Component {
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  renderActions() {
    const { eventId } = this.props.match.params;

    return (
      <>
        <button
          onClick={() => this.props.deleteEvent(eventId)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.event) {
      return 'Are you sure you want to delete this event?';
    }

    return `Are you sure you want to delete the event with title: ${this.props.event.title}?`;
  }

  render() {
    return (
      <Modal
        title="Delete Event"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { event: state.events.eventsAsCreator[ownProps.match.params.eventId] };
};

export default connect(mapStateToProps, { fetchEvent, deleteEvent })(
  EventDelete
);
