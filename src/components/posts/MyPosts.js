import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchMyPosts, fetchMyLikedPosts, like, unlike } from '../../actions';
import MyPostsNav from './MyPostsNav';

const MyPosts = ({
  fetchMyPosts,
  fetchMyLikedPosts,
  myPosts,
  myLikedPosts,
  myLikedPostsArr,
  like,
  unlike,
}) => {
  const btns = ['myPosts', 'likedPosts'];
  const [selectedBtn, setSelectedBtn] = useState(btns[0]);

  useEffect(() => {
    fetchMyPosts();
    fetchMyLikedPosts();
  }, [fetchMyPosts, fetchMyLikedPosts]);

  const toggleDisplay = (e) => {
    const id = e.target.id;
    setSelectedBtn(btns[id]);
  };

  // Stop propagation, with addition of immediate because of react render delay
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const renderPostsList = () => {
    const listType = selectedBtn === 'myPosts' ? 'myPosts' : 'myLikedPosts';
    const posts = listType === 'myPosts' ? myPosts : myLikedPosts;

    if (posts && !isEmpty(posts)) {
      return Object.keys(posts).map((key, i) => {
        return (
          <div className="event-container" key={i}>
            <h2>{key}</h2>
            <div className="grid-container">
              {posts[key].map((post, i) => {
                return (
                  <div className="grid-item" key={i}>
                    <img
                      src={`http://127.0.0.1:3001/img/posts/${post.image}`}
                      alt="post"
                    />
                    {listType === 'myPosts' && renderAdminBtns(post)}
                    {listType === 'myLikedPosts' && renderLikeBtn(post._id)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
    }
    if (posts && isEmpty(posts))
      return (
        <div className="event-container">
          <h2>No posts to show here yet</h2>
        </div>
      );

    return null;
  };

  const renderAdminBtns = (post) => {
    return (
      <div className="img-menu-dropdown">
        <button onClick={(e) => toggleMenu(e)}>
          <FontAwesomeIcon icon="ellipsis-h" className="menu-icon" />
        </button>
        <div className="img-menu-dropdown-content">
          <Link
            to={{
              pathname: `/events/${post.event}/posts/${post._id}/edit`,
              state: { previousPath: `/me/posts}` },
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
              pathname: `/events/${post.event}/posts/${post._id}/delete`,
              state: {
                previousPath: `/me/posts`,
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
  };

  const renderLikeBtn = (postId) => {
    if (!myLikedPostsArr.includes(postId))
      return (
        <div className="likes-btn-container">
          <button onClick={() => like(postId)}>
            <FontAwesomeIcon
              icon={['far', 'heart']}
              className="like-btn gallery-action-btn"
            />
          </button>
        </div>
      );

    if (myLikedPostsArr.includes(postId))
      return (
        <div className="likes-btn-container">
          <button onClick={() => unlike(postId)}>
            <FontAwesomeIcon
              icon={['fas', 'heart']}
              className="like-btn gallery-action-btn"
            />
          </button>
        </div>
      );

    return null;
  };

  return (
    <div className="middle-container">
      <div className="my-posts-header">
        <MyPostsNav selectedBtn={selectedBtn} toggleDisplay={toggleDisplay} />
      </div>
      <div className="my-posts-body">{renderPostsList()}</div>
    </div>
  );
};

const groupBy = (arr, groupByKey) => {
  const grouped = _.mapValues(_.groupBy(arr, groupByKey));
  return grouped;
};

const replaceKeys = (obj, newKeysObj, subKey) => {
  const replacedObj = Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [newKeysObj[key][subKey], val])
  );
  return replacedObj;
};

const mapStateToProps = (state) => {
  let myPosts = Object.values(state.posts.myPosts);
  let myLikedPosts = Object.values(state.posts.myLikedPosts);

  const eventsAsCreator = state.events.eventsAsCreator;
  const eventsAsGuest = state.events.eventsAsGuest;
  const events = { ...eventsAsCreator, ...eventsAsGuest };

  myPosts = groupBy(myPosts, 'event');
  myLikedPosts = groupBy(myLikedPosts, 'event');

  myPosts = replaceKeys(myPosts, events, 'name');
  myLikedPosts = replaceKeys(myLikedPosts, events, 'name');

  return {
    myPosts,
    myLikedPosts,
    myLikedPostsArr: Object.keys(state.posts.myLikedPosts),
  };
};

export default connect(mapStateToProps, {
  fetchMyPosts,
  fetchMyLikedPosts,
  like,
  unlike,
})(MyPosts);
