import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import IconLink from '../../utils/IconLink';
import { updateMe } from '../../../actions';
import { checkIsGuest } from '../../utils/utils';

const CreatePostBtn = ({ eventId, user, eventsAsGuest, updateMe }) => {
  const [isGuest, setIsGuest] = useState(null);

  useEffect(() => {
    const asyncUseEffect = async () => {
      const isCurrentUserGuest = await checkIsGuest(eventId, user.phone);

      if (isCurrentUserGuest === true) {
        setIsGuest(true);
        return updateMe({ eventsAsGuest: eventId });
      }

      setIsGuest(false);
    };

    if (user) {
      if (eventsAsGuest && eventsAsGuest.includes(eventId)) setIsGuest(true);
      if (isGuest === null) asyncUseEffect();
    }
  }, [user]);

  if (isGuest === true)
    return (
      <IconLink
        to={`/events/${eventId}/posts/new/selectPictures`}
        icon="plus-circle"
        iconClass="create-post-btn right-btn"
      />
    );

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
