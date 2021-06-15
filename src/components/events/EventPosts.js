import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { like, unlike } from '../../actions';

const EventPosts = ({ user, posts, eventId, like, unlike }) => {
  const renderAdminBtns = (post) => {
    const currentUser = user._id;
    const userOfPost = post.user._id;
    if (userOfPost === currentUser) {
      return (
        <div>
          <Link to={`/events/${eventId}/posts/${post._id}/edit`}>
            <i className="edit icon"></i>
          </Link>
          <Link
            to={{
              pathname: `/events/${eventId}/posts/${post._id}/dpostete`,
              state: {
                sourcePath: `/events/${eventId}`,
              },
            }}
          >
            <i className="trash icon"></i>
          </Link>
        </div>
      );
    }
    return null;
  };

  const renderLikeBtn = (post) => {
    const currentUser = user._id;
    const userOfPost = post.user._id;
    if (userOfPost !== currentUser) {
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
    }
    return null;
  };

  if (posts) {
    return posts.map((post, i) => {
      return (
        <section key={i}>
          <div>
            <div
              className="inner-block"
              id={`section-${i}`}
              style={{ textAlign: 'center' }}
            >
              <img
                src={`http://127.0.0.1:3001/img/posts/${post.image}`}
                alt="event_post"
              />
              {user && renderAdminBtns(post)}
              {user && renderLikeBtn(post)}
            </div>
          </div>
        </section>
      );
    });
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    posts: Object.values(state.posts.postsOfCurrentEvent),
  };
};

export default connect(mapStateToProps, { like, unlike })(EventPosts);
