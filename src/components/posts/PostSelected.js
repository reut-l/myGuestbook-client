import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  checkIsLoggedIn,
  fetchMyPosts,
  fetchMyLikedPosts,
  like,
  unlike,
} from '../../actions';

const PostSelected = ({
  checkIsLoggedIn,
  fetchMyPosts,
  fetchMyLikedPosts,
  myPosts,
  myLikedPosts,
  user,
  like,
  unlike,
}) => {
  const btns = ['myPosts', 'likedPosts'];
  const [selectedBtn, setSelectedBtn] = useState(btns[0]);
  // const myPostsRef = useRef([]);
  // const myLikedPostsRef = useRef([]);

  useEffect(() => {
    const asyncUseEffect = async () => {
      await checkIsLoggedIn();
      fetchMyPosts();
      fetchMyLikedPosts();
    };
    asyncUseEffect();
  }, []);

  const toggleDispaly = (e) => {
    const id = e.target.id;
    setSelectedBtn(btns[id]);
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
          <div>
            <h2>{key}</h2>
            <div className="ui three column grid">
              {posts[key].map((post, i) => {
                return (
                  <div
                    className="column"
                    // ref={(el) => {
                    //   const itemsRef =
                    //     listType === 'myPosts' ? myPostsRef : myLikedPostsRef;
                    //   itemsRef.current[i] = el;
                    // }}
                    key={i}
                  >
                    <div className="ui segment">
                      <img
                        src={`http://127.0.0.1:3001/img/posts/${post.image}`}
                        alt="post"
                        style={{ width: '100%' }}
                      />
                      {listType === 'myPosts' && renderAdminBtns(post)}
                      {listType === 'myLikedPosts' && renderLikeBtn(post)}
                    </div>
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
        <div>
          <h2>No posts to show here yet</h2>
        </div>
      );

    return null;
  };

  const renderAdminBtns = (post) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Link to={`/events/${post.event}/posts/${post._id}/edit`}>
          <i className="edit icon"></i>
        </Link>
        <Link
          to={{
            pathname: `/events/${post.event}/posts/${post._id}/delete`,
            state: {
              sourcePath: `/me/posts`,
            },
          }}
        >
          <i className="trash icon"></i>
        </Link>
      </div>
    );
  };

  const renderLikeBtn = (post) => {
    if (!post.likes.includes(user._id))
      return (
        <div>
          <button onClick={() => like(post)}>
            <i className="star outline icon"></i>
          </button>
        </div>
      );

    if (post.likes.includes(user._id))
      return (
        <div>
          <button onClick={() => unlike(post)}>
            <i className="star icon"></i>
          </button>
        </div>
      );

    return null;
  };

  return (
    <div>
      <div>
        <button
          disabled={selectedBtn === 'myPosts'}
          onClick={(e) => toggleDispaly(e)}
          id={0}
        >
          My Posts
        </button>
        <button
          disabled={selectedBtn === 'likedPosts'}
          onClick={(e) => toggleDispaly(e)}
          id={1}
        >
          My Liked Posts
        </button>
      </div>
      {renderPostsList()}
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

  return state.posts.loaded
    ? { user: state.auth.user, myPosts, myLikedPosts }
    : {};
};

export default connect(mapStateToProps, {
  checkIsLoggedIn,
  fetchMyPosts,
  fetchMyLikedPosts,
  like,
  unlike,
})(PostSelected);
