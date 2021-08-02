import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login, logout } from '../actions';

const Header = ({ isLoggedIn, logout }) => {
  const pathname = useLocation().pathname;

  // Stop propagation, with addition of immediate because of react render delay
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const renderAuthBtns = () => {
    if (
      isLoggedIn === null ||
      pathname === '/login' ||
      pathname === '/register' ||
      pathname === '/forgotPassword'
    ) {
      return null;
    } else if (isLoggedIn) {
      return (
        <div className="profile-menu-dropdown">
          <button onClick={(e) => toggleMenu(e)}>
            <FontAwesomeIcon icon="user" className="profile-icon" />
          </button>
          <div className="profile-menu-dropdown-content">
            <Link to="/me/posts">
              <span>My Posts</span>
              <span onClick={logout}>Logout</span>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Link
            to={{ pathname: '/login', state: { previousPath: '/' } }}
            className="btn"
          >
            Log in
          </Link>
          <Link
            to={{ pathname: '/register', state: { previousPath: '/' } }}
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
          <img src="/img/logo.png" alt="guestbook_logo" />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps, { login, logout })(Header);
