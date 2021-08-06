import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkIsLoggedIn } from '../actions';
import EventList from './events/EventList';
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
      <div className="middle-container dashboard-container">
        <EventList
          itemsArr={eventsAsCreator}
          title="Events I Created"
          admin={true}
        />
        <EventList itemsArr={eventsAsGuest} title="Events I Visited" />
        {eventsAsCreator.length === 0 && eventsAsGuest.length === 0 && (
          <CSSTransition
            in={true}
            appear={true}
            timeout={7000}
            classNames="helper"
          >
            <div className="helper-box">
              <p>
                <FontAwesomeIcon icon="hand-pointer" className="helper-arrow" />
              </p>
              <p>Create your first event</p>
            </div>
          </CSSTransition>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    eventsAsCreator: Object.values(state.events.eventsAsCreator),
    eventsAsGuest: Object.values(state.events.eventsAsGuest),
  };
};

export default connect(mapStateToProps, { checkIsLoggedIn })(Dashboard);
