import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions';

const Header = ({ isLoggedIn, login, logout }) => {
  const renderAuthBtns = () => {
    if (isLoggedIn === null) {
      return null;
    } else if (isLoggedIn) {
      return (
        <div className="ui simple dropdown item">
          <i className="user icon"></i>
          <div className="menu">
            <div onClick={logout} className="item">
              Logout
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <button onClick={login} className="ui button">
            Log In
          </button>
          <Link to="/register" className="ui button primary">
            Register
          </Link>
        </React.Fragment>
      );
    }
  };

  return (
    <div className="ui pointing menu">
      <div className="right menu">{renderAuthBtns()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps, { login, logout })(Header);
