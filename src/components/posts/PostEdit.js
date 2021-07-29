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

  if (post) {
    return (
      <CustomImageEditor
        onImageSave={onImageSave}
        initialImage={`http://127.0.0.1:3001/img/posts/${post.image}`}
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    post: state.posts.currentPost,
  };
};

export default connect(mapStateToProps, { fetchPost, updatePostImage })(
  PostEdit
);
