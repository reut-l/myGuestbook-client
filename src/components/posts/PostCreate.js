import React from 'react';
import { connect } from 'react-redux';
import CustomImageEditor from '../utils/imageEditor/CustomImageEditor';
import { createPost } from '../../actions';

const PostCreate = ({ createPost, match }) => {
  const onImageSave = (blob) => {
    const eventId = match.params.eventId;
    createPost(blob, eventId);
  };

  return <CustomImageEditor onImageSave={onImageSave} />;
};

export default connect(null, { createPost })(PostCreate);
