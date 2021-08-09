import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CustomImageEditor from '../utils/imageEditor/CustomImageEditor';
import { fetchPost, updatePostImage } from '../../actions';

const PostEdit = ({
  fetchPost,
  updatePostImage,
  match: {
    params: { eventId, postId },
  },
  post,
}) => {
  useEffect(() => {
    fetchPost(postId);
  }, [postId, fetchPost]);

  const onImageSave = (blob) => {
    updatePostImage(blob, postId, eventId);
  };

  if (post !== null) {
    return (
      <CustomImageEditor
        onImageSave={onImageSave}
        initialImage={`${process.env.REACT_APP_SERVER_URL}/img/posts/${post.image}`}
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { eventId, postId },
    },
  } = ownProps;

  return {
    post:
      state.posts.allByEvent[eventId][postId] || state.posts.myPosts[postId],
  };
};

export default connect(mapStateToProps, { fetchPost, updatePostImage })(
  PostEdit
);
