import React from 'react';
import { connect } from 'react-redux';

const EventPosts = (props) => {
  const renderAdminBtns = (userOfPost) => {
    if (props.user) {
      const userId = props.user._id;
      if (userOfPost === userId) {
        return (
          <div style={{ textAlign: 'center' }}>
            <i className="edit icon"></i>
            <i className="trash icon"></i>
          </div>
        );
      }
    }
    return null;
  };

  if (props.posts) {
    return props.posts.map((el, i) => {
      return (
        <section key={i}>
          <div>
            <div className="inner-block" id={`section-${i}`}>
              <img
                src={`http://127.0.0.1:3001/img/posts/${el.image}`}
                alt="event_post"
              />
            </div>
            {renderAdminBtns(el.user)}
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

export default connect(mapStateToProps)(EventPosts);
