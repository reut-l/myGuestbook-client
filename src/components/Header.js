import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login, logout } from '../actions';

const Header = ({ isLoggedIn, logout }) => {
  const pathname = useLocation().pathname;
  const [showDropdown, setShowDropdown] = useState(false);
  // Stop propagation, with addition of immediate because of react render delay
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    // setHideDropdown(null);
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
        <div className="profile-menu-dropdown" onClick={toggleDropdown}>
          <button>
            <FontAwesomeIcon icon="user" className="profile-icon" />
          </button>
          <div
            className={`profile-menu-dropdown-content ${
              showDropdown ? 'opened' : 'closed'
            }`}
          >
            <Link to="/me/posts">
              <span>My Posts</span>
            </Link>
            <span className="dropdown-item" onClick={logout}>
              Logout
            </span>
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
