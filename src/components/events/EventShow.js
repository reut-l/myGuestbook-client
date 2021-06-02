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
    return (
      <Fragment>
        <SearchGuests eventId={this.props.match.params.eventId} />
        <EventCover eventId={this.props.match.params.eventId} />
        <EventPosts />
      </Fragment>
    );
  }
}

export default connect(null, { checkIsLoggedIn })(EventShow);
