import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EventCover from './EventCover';
import EventPosts from './EventPosts';
import SearchGuests from './fields/SearchGuests';
import { checkIsLoggedIn } from '../../actions';

class EventShow extends Component {
  componentDidMount() {
    this.props.checkIsLoggedIn();
  }

  render() {
    const { eventId } = this.props.match.params;
    return (
      <Fragment>
        <SearchGuests eventId={eventId} />
        <EventCover eventId={eventId} />
        <EventPosts eventId={eventId} />
      </Fragment>
    );
  }
}

export default connect(null, { checkIsLoggedIn })(EventShow);
