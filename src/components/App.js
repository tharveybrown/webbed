import React, { useState, useEffect } from "react";
import "../App.css";
import SignInForm from "./Register/SignInForm";
import LoginForm from "./Login/LoginForm";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import Feedback from "./Feedback/Summary";
import NewFeedback from "./Feedback/NewFeedback";
import RequestFeedback from "./Feedback/RequestFeedback";
import TeamOverview from "./Team/Overview";
import Logout from "./Register/Logout";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";

import SideBar from "./Layout/Sidebar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";

/*required components for routing*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { render } from "@testing-library/react";
// var theme = useTheme();
/*default material-ui theme generation*/
// var useStyles = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#3814DB",
//       light: "#7b48ff",
//       dark: "#0000a8",
//     },
//     secondary: {
//       main: "#E60150",
//       light: "#ff567c",
//       dark: "#ac0029",
//     },
//     inherit: {
//       main: "#00be58",
//       light: "#5bf287",
//       dark: "#008c2b",
//     },

// warning: {
//   main: "#ffeb3b",
//   light: "#ffff72",
//   dark: "#c8b900",
// },
// },
// secondaryButton: {
//   backgroundColor: "#00be58",
//   "&:hover": {
//     backgroundColor: "#008c2b",
//   },
// },
// });

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logout: {
    position: "relative",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const url = runtimeEnv().REACT_APP_API_URL;

function App(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [coworkers, setCoworkers] = useState([]);
  const [slackTeam, setSlackTeam] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    autoLogin();
    fetchCoworkers();
    // fetchSlackUsers();
  }, []);

  const autoLogin = () => {
    const token = localStorage.getItem("token");
    setLoggedIn(true);
    if (token) {
      fetch(`${url}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
          setSlackTeam(data.slack_team);
        });
    } else {
      setLoggedIn(false);
    }
  };

  const fetchCoworkers = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${url}/coworkers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCoworkers(data);
        });
    }
  };

  const fetchSlackUsers = () => {
    const token = localStorage.getItem("token");
    fetch(`${url}/slack/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return setSlackTeam(res.slack_users);
      });
  };

  const authenticateSlack = (params) => {
    const token = localStorage.getItem("token");
    fetch(`${url}/auth/callback/${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // window.location.pathname = "/dashboard";
        // fetchSlackUsers();
        console.log(res);
      });
  };

  const handleLogin = (user) => {
    setUser(user);
    setSlackTeam(user.slack_team);
    setLoggedIn(true);
    fetchCoworkers();
    // fetchSlackUsers();
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    let status = token ? true : false;
    setLoggedIn(status);
  };

  const handleLogout = () => {
    localStorage.clear();
    isAuthenticated();
    setUser({});
  };

  const submitFeedback = (evt, feedback) => {
    evt.preventDefault();
    const token = localStorage.getItem("token");
    fetch(`${url}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(feedback),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.pathname = "/feedback";
      });
  };

  const requestFeedback = (evt, feedback) => {
    evt.preventDefault();
    const token = localStorage.getItem("token");
    fetch(`${url}/feedback/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(feedback),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.pathname = "/feedback";
      });
  };

  const updateTeam = (employee, action, role) => {
    const token = localStorage.getItem("token");
    fetch(`${url}/${role}/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((data) => {
        setCoworkers(data);
      });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <div className={classes.root}>
        <Router>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                {/* {user.organization ? user.organization.name : null} */}
              </Typography>
              {isLoggedIn ? (
                <Logout handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
              ) : null}
            </Toolbar>
          </AppBar>
          <SideBar isLoggedIn={isLoggedIn} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Switch>
              <Route
                path="/dashboard"
                render={(props) => (
                  <Dashboard
                    {...props}
                    authenticateSlack={authenticateSlack}
                    slackTeam={slackTeam ? slackTeam : null}
                    handleLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                  />
                )}
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
                    handleSubmit={submitFeedback}
                    coworkers={coworkers}
                  />
                )}
              />
              <Route
                path="/request"
                render={(props) => (
                  <RequestFeedback
                    {...props}
                    handleSubmit={requestFeedback}
                    coworkers={coworkers}
                    skills={user.skills}
                  />
                )}
              />
              {/* </> */}
              {/* ) : ( */}
              {/* <> */}
              {/* <Redirect to="/login" /> */}
              <Route
                exact
                path="/register"
                component={() => <SignInForm handleLogin={handleLogin} />}
                render={(props) => (
                  <SignInForm
                    className={classes.logout}
                    {...props}
                    handleLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
              <Route
                exact
                path="/login"
                render={(props) => (
                  <LoginForm
                    {...props}
                    handleLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
              {/* </> */}
              {/* )} */}
            </Switch>
          </main>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
