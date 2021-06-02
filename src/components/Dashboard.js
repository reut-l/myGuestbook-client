import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIsLoggedIn } from '../actions';
import EventList from './events/EventList';

class Dashboard extends Component {
  componentDidMount() {
    this.props.checkIsLoggedIn();
  }

  render() {
    const { eventsAsGuest, eventsAsCreator } = this.props;
    return (
      <React.Fragment>
        <EventList
          itemsArr={eventsAsCreator}
          title="Events I Created"
          admin={true}
        />
        <EventList itemsArr={eventsAsGuest} title="Events I Visited" />
      </React.Fragment>
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
