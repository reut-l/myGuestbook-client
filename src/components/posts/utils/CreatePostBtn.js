import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import IconLink from '../../utils/IconLink';
import { updateMe } from '../../../actions';
import { checkIsGuest } from '../../utils/utils';

const CreatePostBtn = ({ eventId, user, eventsAsGuest, updateMe }) => {
  const [isGuest, setIsGuest] = useState(null);

  useEffect(() => {
    const asyncUseEffect = async () => {
      // Check if the current user phone is on the current event's guest phone list
      const isCurrentUserGuest = await checkIsGuest(eventId, user.phone);

      if (isCurrentUserGuest === true) {
        setIsGuest(true);

        // Update the current event in the user's attended events in the DB and in redux state
        return updateMe({ eventsAsGuest: eventId });
      }

      setIsGuest(false);
    };

    // Check if current user is a guest of the current event
    if (user) {
      // A) First check if already updated in the redux state that he is a guest
      if (eventsAsGuest && eventsAsGuest.includes(eventId)) setIsGuest(true);

      // B) If not, check it with the DB and update redux state accordingly
      if (isGuest === null) asyncUseEffect();
    }
  }, [user, eventId, eventsAsGuest, updateMe, isGuest]);

  // If current user is a guest, than will be directed directly to create post page
  if (isGuest === true)
    return (
      <IconLink
        to={`/events/${eventId}/posts/new/selectPictures`}
        icon="plus-circle"
        iconClass="create-post-btn right-btn"
      />
    );

  // If current user is not a guest according to the current DB, than first he will be redirected to registration page
  if (isGuest === false || isGuest === null)
    return (
      <IconLink
        to="/register"
        previousPath={`/events/${eventId}`}
        icon="plus-circle"
        iconClass="create-post-btn right-btn"
      />
    );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user ? state.auth.user : null,
    eventsAsGuest: Object.values(state.events.eventsAsGuest),
  };
};

export default connect(mapStateToProps, { updateMe })(CreatePostBtn);
