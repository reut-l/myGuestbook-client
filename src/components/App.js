import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkIsLoggedIn } from '../actions';
import Header from './Header';
import Footer from './Footer';
import Welcome from './Welcome';
import Dashboard from './Dashboard';
import Register from './auth/Register';
import EventShow from './events/EventShow';
import CreateEventWizardForm from './events/EventCreate/CreateEventWizardForm';
import EventEdit from './events/EventEdit';
import EventDelete from './events/EventDelete';
import EventAddPictures from './events/EventAddPictures';
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';
import PostDelete from './posts/PostDelete';
import PostPicturesSelector from './posts/PostPicturesSelector';
import PostSelected from './posts/PostSelected';
import Login from './auth/Login';
import PhoneAuth from './auth/guestAuth/PhoneAuth';
import history from '../history';

class App extends React.Component {
  componentDidMount() {
    this.props.checkIsLoggedIn();
  }

  renderFirstPage = () => {
    if (this.props.isLoggedIn === false) {
      return () => <Welcome />;
    } else if (this.props.isLoggedIn === true) {
      return () => <Dashboard />;
    }
  };

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route
                path="/"
                exact
                component={
                  this.props.isLoggedIn === false
                    ? () => <Welcome />
                    : () => <Dashboard />
                }
              ></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route
                path="/events/new"
                exact
                component={CreateEventWizardForm}
              ></Route>
              <Route
                path="/events/:eventId/phoneAuth"
                exact
                component={PhoneAuth}
              ></Route>
              <Route
                path="/events/:eventId/edit/uploadImages"
                exact
                component={EventAddPictures}
              ></Route>
              <Route
                path="/events/:eventId/edit"
                exact
                component={EventEdit}
              ></Route>
              <Route
                path="/events/:eventId/delete"
                exact
                component={EventDelete}
              ></Route>
              <Route
                path="/events/:eventId/posts/new/selectPictures"
                exact
                component={PostPicturesSelector}
              ></Route>
              <Route
                path="/events/:eventId/posts/new"
                exact
                component={PostCreate}
              ></Route>
              <Route
                path="/events/:eventId/posts/:postId/edit"
                exact
                component={PostEdit}
              ></Route>
              <Route
                path="/events/:eventId/posts/:postId/delete"
                exact
                component={PostDelete}
              ></Route>
              <Route
                path="/events/:eventId"
                exact
                component={EventShow}
              ></Route>
              <Route path="/me/posts" exact component={PostSelected}></Route>
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps, { checkIsLoggedIn })(App);
