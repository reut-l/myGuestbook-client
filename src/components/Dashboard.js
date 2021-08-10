import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkIsLoggedIn } from '../actions';
import EventList from './events/EventList';
import Guidance from './utils/Guidance';
import IconLink from './utils/IconLink';

const Dashboard = ({ eventsAsCreator, eventsAsGuest, checkIsLoggedIn }) => {
  useEffect(() => {
    checkIsLoggedIn();
  }, [checkIsLoggedIn]);

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
        {eventsAsCreator.length === 0 && eventsAsGuest.length === 0 && (
          <Guidance
            text="Create your first event"
            icon="hand-pointer"
            animation="to-page-top"
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    eventsAsCreator: Object.values(state.events.eventsAsCreator),
    eventsAsGuest: Object.values(state.events.eventsAsGuest),
  };
};

export default connect(mapStateToProps, { checkIsLoggedIn })(Dashboard);
