import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  checkIsLoggedIn,
  fetchMyPosts,
  fetchMyLikedPosts,
} from '../../actions';

const PostSelected = ({
  checkIsLoggedIn,
  myPosts,
  myLikedPosts,
  fetchMyPosts,
  fetchMyLikedPosts,
}) => {
  const btns = ['myPosts', 'likedPosts'];
  const [selectedBtn, setSelectedBtn] = useState(btns[0]);
  const myPostsRef = useRef([]);
  const myLikedPostsRef = useRef([]);

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

  const renderPostsList = () => {
    const listType = selectedBtn === 'myPosts' ? 'myPosts' : 'myLikedPosts';
    const posts = listType === 'myPosts' ? myPosts : myLikedPosts;

    return Object.keys(posts).map((key, i) => {
      return (
        <div>
          <h2>{key}</h2>
          <div className="ui three column grid">
            {posts[key].map((post, i) => {
              return (
                <div
                  className="column"
                  ref={(el) => {
                    const itemsRef =
                      listType === 'myPosts' ? myPostsRef : myLikedPostsRef;
                    itemsRef.current[i] = el;
                  }}
                  key={i}
                >
                  <div className="ui segment">
                    <img
                      src={`http://127.0.0.1:3001/img/posts/${post.image}`}
                      alt="post"
                      style={{ width: '100%' }}
                    />
                    {listType === 'myPosts' && renderAdminBtns()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const renderAdminBtns = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <i className="edit icon"></i>
        <i className="trash icon"></i>
      </div>
    );
  };

  return (
    <div>
      <div>
        <button
          disabled={selectedBtn === 'myPosts'}
          onClick={(e) => toggleDispaly(e)}
          id={1}
        >
          My Posts
        </button>
        <button
          disabled={selectedBtn === 'likedPosts'}
          onClick={(e) => toggleDispaly(e)}
          id={0}
        >
          My Liked Posts
        </button>
      </div>
      {renderPostsList()}
    </div>
  );
};

const groupBy = (arr, groupByKey) => {
  const grouped = _.mapValues(_.groupBy(arr, groupByKey), (ObjList) =>
    ObjList.map((obj) => _.omit(obj, groupByKey))
  );
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
  };
};

export default connect(mapStateToProps, {
  checkIsLoggedIn,
  fetchMyPosts,
  fetchMyLikedPosts,
})(PostSelected);
