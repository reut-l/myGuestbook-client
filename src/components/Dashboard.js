import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIsLoggedIn } from '../actions';
import EventList from './events/EventList';
import IconLink from './utils/IconLink';

class Dashboard extends Component {
  componentDidMount() {
    this.props.checkIsLoggedIn();
  }

  render() {
    const { eventsAsGuest, eventsAsCreator } = this.props;
    return (
      <>
        <div>
          <IconLink
            to="/events/new"
            previousPath="/"
            icon="plus-circle"
            iconClass="create-event-btn"
          />
        </div>
        <div className="middle-container">
          <EventList
            itemsArr={eventsAsCreator}
            title="Events I Created"
            admin={true}
          />
          <EventList itemsArr={eventsAsGuest} title="Events I Visited" />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    eventsAsCreator: Object.values(state.events.eventsAsCreator),
    eventsAsGuest: Object.values(state.events.eventsAsGuest),
  };
};

export default connect(mapStateToProps, { checkIsLoggedIn })(Dashboard);
