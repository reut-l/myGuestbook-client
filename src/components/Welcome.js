import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import history from '../history';

const Welcome = ({ redirected }) => {
  useEffect(() => {
    if (redirected) history.push('/');
  }, [redirected]);

  return (
    <div className="container welcome-container middle-container">
      <CSSTransition
        in={true}
        timeout={10000}
        classNames="welcome-photo-transition"
        unmountOnExit
        appear
      >
        <div
          className="welcome-photo"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/img/openAlbum.png)`,
          }}
        ></div>
      </CSSTransition>
      <CSSTransition
        in={true}
        timeout={2000}
        classNames="welcome-text-transition"
        unmountOnExit
        appear
      >
        <div className="welcome-text">
          <h1>My Guestbook</h1>
          <p>Creating memories from events</p>
          <Link
            to={{ pathname: '/register', state: { previousPath: '/' } }}
            className="btn"
          >
            Let's Start
          </Link>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Welcome;
