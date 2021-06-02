import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMyPosts, fetchMyLikedPosts } from '../../actions';

const PostSelected = ({
  myPosts,
  myLikedPosts,
  fetchMyPosts,
  fetchMyLikedPosts,
}) => {
  const btns = ['myPosts', 'likedPosts'];
  const [enabledBtn, setEnabledBtn] = useState(btns[0]);

  useEffect(() => {
    fetchMyPosts();
    fetchMyLikedPosts();
  }, []);

  const toggleDispaly = (e) => {
    const id = e.target.id;
    setEnabledBtn(btns[id]);
  };

  const renderPostsList = () => {
    // const posts = enabledBtn === 'myPosts' ? myPosts : myLikedPosts;
  };

  return (
    <div>
      <div>
        <button
          disabled={enabledBtn !== 'myPosts'}
          onClick={(e) => toggleDispaly(e)}
          id={1}
        >
          My Posts
        </button>
        <button
          disabled={enabledBtn !== 'likedPosts'}
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

const mapStateToProps = (state) => {
  const myPosts = Object.Values(state.posts.myPosts);
  const myLikedPosts = Object.Values(state.posts.myLikedPosts);

  return {
    myPosts: groupBy(myPosts, 'event'),
    myLikedPosts: groupBy(myLikedPosts, 'event'),
  };
};

export default connect(mapStateToProps, { fetchMyPosts, fetchMyLikedPosts })(
  PostSelected
);
