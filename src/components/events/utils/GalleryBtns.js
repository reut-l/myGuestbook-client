import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchMyPosts,
  fetchMyLikedPosts,
  like,
  unlike,
} from '../../../actions';

const GalleryBtns = ({
  eventId,
  currentPostId,
  user,
  myPosts,
  myLikedPosts,
  fetchMyPosts,
  fetchMyLikedPosts,
  like,
  unlike,
}) => {
  useEffect(() => {
    if (user) {
      fetchMyPosts();
      fetchMyLikedPosts();
    }
  }, [user]);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const renderAdminBtns = () => {
    if (myPosts.includes(currentPostId)) {
      return (
        <div className="img-menu-dropdown">
          <button onClick={(e) => toggleMenu(e)}>
            <FontAwesomeIcon icon="ellipsis-h" className="menu-icon" />
          </button>
          <div className="img-menu-dropdown-content">
            <Link
              to={{
                pathname: `/events/${eventId}/posts/${currentPostId}/edit`,
                state: { sourcePath: `/events/${eventId}` },
              }}
            >
              <FontAwesomeIcon
                icon="pen"
                className="edit-btn gallery-action-btn"
              />
              <span>Edit</span>
            </Link>
            <Link
              to={{
                pathname: `/events/${eventId}/posts/${currentPostId}/delete`,
                state: {
                  sourcePath: `/events/${eventId}`,
                },
              }}
            >
              <FontAwesomeIcon
                icon="trash"
                className="delete-btn gallery-action-btn"
              />
              <span>Delete</span>
            </Link>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLikeBtn = () => {
    if (!myPosts.includes(currentPostId)) {
      if (!myLikedPosts.includes(currentPostId))
        return (
          <div className="like-btn-container">
            <button onClick={() => like(currentPostId)}>
              <FontAwesomeIcon
                icon={['far', 'heart']}
                className="like-btn gallery-action-btn"
              />
            </button>
          </div>
        );

      if (myLikedPosts.includes(currentPostId))
        return (
          <div className="like-btn-container">
            <button onClick={() => unlike(currentPostId)}>
              <FontAwesomeIcon
                icon={['fas', 'heart']}
                className="like-btn gallery-action-btn"
              />
            </button>
          </div>
        );
    }
    return null;
  };

  return (
    <div className="gallery-action-btns-container">
      {myPosts && renderAdminBtns()}
      {myLikedPosts && renderLikeBtn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user ? state.auth.user._id : null,
    myPosts: Object.keys(state.posts.myPosts),
    myLikedPosts: Object.keys(state.posts.myLikedPosts),
  };
};

export default connect(mapStateToProps, {
  fetchMyPosts,
  fetchMyLikedPosts,
  like,
  unlike,
})(GalleryBtns);
