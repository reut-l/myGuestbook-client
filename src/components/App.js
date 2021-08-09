import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkIsLoggedIn } from '../actions';
import Header from './Header';
import Footer from './Footer';
import AuthNav from './auth/AuthNav';
import Dashboard from './Dashboard';
import RegisterWizardForm from './auth/Register/RegisterWizardForm';
import EventShow from './events/EventShow';
import CreateEventWizardForm from './events/EventCreate/CreateEventWizardForm';
import EventEdit from './events/EventEdit';
import EventDelete from './events/EventDelete';
import EventAddPictures from './events/EventAddPictures';
import EventSendSms from './events/EventSendSms';
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';
import PostDelete from './posts/PostDelete';
import PostPicturesSelector from './posts/PostPicturesSelector';
import MyPosts from './posts/MyPosts';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import ProtectedRoute from './utils/ProtectedRoute';
import GeneralError from './utils/Error/GeneralError';
import RoutingError from './utils/Error/RoutingError';
import history from '../history';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faEyeSlash,
  faPlusCircle,
  faPen,
  faTrash,
  faEllipsisH,
  faCog,
  faSearch,
  faUser,
  faHeart as fasHeart,
  faCloudUploadAlt,
  faHandPointer,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import '../scss/style.scss';

library.add(
  faEye,
  faEyeSlash,
  faPlusCircle,
  faPen,
  faTrash,
  faEllipsisH,
  faCog,
  faSearch,
  faUser,
  fasHeart,
  farHeart,
  faCloudUploadAlt,
  faHandPointer
);

const App = ({
  isLoggedIn,
  checkIsLoggedIn,
  dbBasedRoutingError,
  generalError,
}) => {
  const [logStatusFetched, setLogStatusFetched] = useState(false);

  useEffect(() => {
    const fetchLogStatus = async () => {
      await checkIsLoggedIn();
      setLogStatusFetched(true);
    };
    fetchLogStatus();
  }, [checkIsLoggedIn]);

  if (!dbBasedRoutingError && !generalError && logStatusFetched === true) {
    if (isLoggedIn !== null)
      return (
        <>
          <Router history={history}>
            <div className="main-container">
              <Header />
              <Switch>
                <Route path="/register" exact component={AuthNav}></Route>
                <Route path="/login" exact component={AuthNav}></Route>
              </Switch>
              <Switch>
                <ProtectedRoute
                  path="/"
                  exact
                  component={Dashboard}
                  isLoggedIn={isLoggedIn}
                />
                <Route
                  path="/register"
                  exact
                  component={RegisterWizardForm}
                ></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route
                  path="/forgotPassword"
                  exact
                  component={ForgotPassword}
                ></Route>
                <Route
                  path="/resetPassword/:token"
                  exact
                  component={ResetPassword}
                ></Route>
                <ProtectedRoute
                  path="/events/new"
                  exact
                  component={CreateEventWizardForm}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/edit/uploadImages"
                  exact
                  component={EventAddPictures}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/edit"
                  exact
                  component={EventEdit}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/delete"
                  exact
                  component={EventDelete}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/posts/new/selectPictures"
                  exact
                  component={PostPicturesSelector}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/posts/new"
                  exact
                  component={PostCreate}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/posts/:postId/edit"
                  exact
                  component={PostEdit}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/posts/:postId/delete"
                  exact
                  component={PostDelete}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/events/:eventId/sendSms"
                  exact
                  component={EventSendSms}
                  isLoggedIn={isLoggedIn}
                />
                <Route
                  path="/events/:eventId"
                  exact
                  component={EventShow}
                ></Route>
                <ProtectedRoute
                  path="/me/posts"
                  exact
                  component={MyPosts}
                  isLoggedIn={isLoggedIn}
                />
                <Route
                  path="/"
                  render={(props) => (
                    <RoutingError reactRouterRoutingError={true} {...props} />
                  )}
                ></Route>
              </Switch>
              <Footer />
            </div>
          </Router>
        </>
      );
  }

  if (dbBasedRoutingError) {
    return <RoutingError />;
  }

  if (generalError) {
    return <GeneralError />;
  }

  return null;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    dbBasedRoutingError: state.errors.routing,
    generalError: state.errors.general,
  };
};

export default connect(mapStateToProps, { checkIsLoggedIn })(App);
