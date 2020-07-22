import React, { useState, useEffect } from "react";
import "../App.css";
// import Header from "../Header";
import SignInForm from "./Register/SignInForm";
import LoginForm from "./Login/LoginForm";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import withStyles from "@material-ui/core/styles/withStyles";
import Logout from "./Register/Logout";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";

import SideBar from "./Layout/Sidebar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

/*required components for routing*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { render } from "@testing-library/react";

/*default material-ui theme generation*/
const theme = createMuiTheme();

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
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${url}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
          setLoggedIn(true);
        });
    }
  };

  const handleLogin = (user) => {
    setUser(user);
    setLoggedIn(true);
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

  const handleAuthClick = () => {
    const token = localStorage.getItem("token");
    fetch(`${url}/user_is_authed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };
  console.log("USER", user);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <div className={classes.root}>
        <Router>
          {isLoggedIn ? (
            <>
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <Typography variant="h6" noWrap>
                    {/* {user.organization ? user.organization.name : null} */}
                  </Typography>
                  <Logout handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
                </Toolbar>
              </AppBar>
              <SideBar />
            </>
          ) : null}

          <main className={classes.content}>
            <div className={classes.toolbar} />
            {!isLoggedIn ? <Route exact path="/" component={HomePage} /> : null}
            <Switch>
              {/* Routing according to the path entered */}
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
              {/* <PrivateRoute path="/dashboard">
            <Dashboard handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
          </PrivateRoute> */}
              <Route
                path="/dashboard"
                render={(props) => (
                  <Dashboard
                    {...props}
                    handleLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />

              {/* <Route exact path="/" component={Dashboard} /> */}
            </Switch>
          </main>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
