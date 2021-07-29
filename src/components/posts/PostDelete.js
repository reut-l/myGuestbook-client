import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchPost, deletePost } from '../../actions';

const PostDelete = ({
  fetchPost,
  deletePost,
  match: {
    params: { postId, eventId },
  },
  location,
}) => {
  useEffect(() => {
    fetchPost(postId, eventId);
  }, [postId, eventId, fetchPost]);

  // Render action buttens
  const renderActions = () => {
    return (
      <div className="actions-btns">
        <button
          onClick={() => deletePost(postId, eventId)}
          className="btn btn-warning"
        >
          Delete
        </button>
        <Link to={location.state.previousPath} className="btn btn-outline">
          Cancel
        </Link>
      </div>
    );
  };

  const renderContent = () => {
    return 'Are you sure you want to delete your post?';
  };

  return (
    <Modal
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push(`${location.state.previousPath}`)}
    />
  );
};

export default connect(null, { fetchPost, deletePost })(PostDelete);
