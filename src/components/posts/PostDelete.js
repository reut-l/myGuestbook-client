import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchPost, deletePost } from '../../actions';

class PostDelete extends Component {
  componentDidMount() {
    const { postId, eventId } = this.props.match.params;
    this.props.fetchPost(postId, eventId);
  }

  renderActions() {
    const { postId, eventId } = this.props.match.params;

    return (
      <>
        <button
          onClick={() => this.props.deletePost(postId, eventId)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={this.props.location.state.sourcePath} className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    return 'Are you sure you want to delete your post?';
  }

  render() {
    return (
      <Modal
        title="Delete Post"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() =>
          history.push(`${this.props.location.state.sourcePath}`)
        }
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { post: state.posts.myPosts[ownProps.match.params.postId] };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDelete);
