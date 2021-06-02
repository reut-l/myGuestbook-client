import React from 'react';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (
      <div style={{ height: '85vh', backgroundColor: 'Grey' }}>
        <h1>My Guestbook</h1>
        <Link to="" className="ui button primary">
          Let's Start
        </Link>
      </div>
    );
  }
}

export default Welcome;
