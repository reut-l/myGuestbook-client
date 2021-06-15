import React from 'react';
import { connect } from 'react-redux';
import CustomImageEditor from '../utils/imageEditor/CustomImageEditor';
import { createPost } from '../../actions';

const PostCreate = ({
  createPost,
  match: {
    params: { eventId },
  },
}) => {
  const onImageSave = (blob) => {
    createPost(blob, eventId);
  };

  return <CustomImageEditor onImageSave={onImageSave} />;
};

export default connect(null, { createPost })(PostCreate);
