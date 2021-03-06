import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignInForm from "./Register/SignInForm";
import LoginForm from "./Login/LoginForm";

import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import Feedback from "./Feedback/Summary";
import NewFeedback from "./Feedback/NewFeedback";
import RequestFeedback from "./Feedback/RequestFeedback";
import TeamOverview from "./Team/Overview";
import Profile from "./Register/Profile";

export const auth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else return false;
  // signedIn: false,
};

const PrivateRoute = ({
  component: Component,
  handleLogout,
  slackTeam,
  authenticateSlack,
  ...rest
}) => {
  const token = localStorage.getItem("token");
  const isAuth = token ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component
            {...props}
            // isLoggedIn={isLoggedIn}
            slackTeam={slackTeam}
            handleLogout={handleLogout}
            authenticateSlack={authenticateSlack}
          />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function AppRouter(props) {
  const {
    authenticateSlack,
    slackTeam,
    handleLogout,
    isLoggedIn,
    coworkers,
    user,
    updateTeam,
    submitFeedback,
    updateFeedback,
    handleLogin,
    requestFeedback,
  } = props;

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/dashboard"}
        component={Dashboard}
        slackTeam={slackTeam}
        handleLogout={handleLogout}
        authenticateSlack={authenticateSlack}
      />

      <Route
        path="/feedback"
        render={(props) => (
          <Feedback
            {...props}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={(props) => <HomePage {...props} isLoggedIn={isLoggedIn} />}
      />

      <Route
        path="/team"
        render={(props) => (
          <TeamOverview
            {...props}
            slackUsers={slackTeam ? slackTeam : null}
            coworkers={coworkers}
            isLoggedIn={isLoggedIn}
            jobType={user.job_type}
            updateTeam={updateTeam}
          />
        )}
      />
      <Route
        path="/new"
        render={(props) => (
          <NewFeedback
            {...props}
            handleUpdate={updateFeedback}
            handleSubmit={submitFeedback}
            coworkers={coworkers.coworkers}
          />
        )}
      />
      <Route
        path="/request"
        render={(props) => (
          <RequestFeedback
            {...props}
            handleSubmit={requestFeedback}
            coworkers={coworkers.coworkers}
            skills={user.skills}
          />
        )}
      />

      <Route
        exact
        path="/register"
        render={(props) => (
          <SignInForm
            // className={classes.logout}
            {...props}
            handleLogin={handleLogin}
            isLoggedIn={isLoggedIn}
          />
        )}
      />
      <Route
        exact
        path="/profile"
        render={(props) => (
          <Profile {...props} user={user} isLoggedIn={isLoggedIn} />
        )}
      />
      <Route
        // exact
        path="/login"
        render={(props) => (
          <LoginForm
            {...props}
            handleLogin={handleLogin}
            isLoggedIn={isLoggedIn}
          />
        )}
      />
    </Switch>
  );
}

export default AppRouter;
