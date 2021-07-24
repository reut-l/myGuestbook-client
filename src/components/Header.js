import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login, logout } from '../actions';

const Header = ({ isLoggedIn, logout }) => {
  const pathname = useLocation().pathname;

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const renderAuthBtns = () => {
    if (
      isLoggedIn === null ||
      pathname === '/login' ||
      pathname === '/register'
    ) {
      return null;
    } else if (isLoggedIn) {
      return (
        <div className="profile-menu-dropdown">
          <button onClick={(e) => toggleMenu(e)}>
            <FontAwesomeIcon icon="user" className="profile-icon" />
          </button>
          <div className="profile-menu-dropdown-content">
            <span onClick={logout}>Logout</span>
            <Link to="/me/posts">
              <span>My Posts</span>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Link
            to={{ pathname: '/login', state: { sourcePath: '/' } }}
            className="btn"
          >
            Log in
          </Link>
          <Link
            to={{ pathname: '/register', state: { sourcePath: '/' } }}
            className="btn btn-action"
          >
            Register
          </Link>
        </>
      );
    }
  };

  return (
    <div className="header">
      <div className="right-menu">{renderAuthBtns()}</div>
      <div className="left-menu">
        <Link to="/">
          <img src="http://localhost:3000/img/logo.png" alt="guestbook_logo" />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps, { login, logout })(Header);
