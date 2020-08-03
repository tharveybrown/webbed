import React, { useState, useEffect } from "react";
import "../App.css";

import runtimeEnv from "@mars/heroku-js-runtime-env";
import Sidebar from "./Layout/Sidebar";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppRouter from "./router";
import { light, dark, overrides } from "../themes/default";
import Background from "./Background.svg";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";

/*required components for routing*/
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // backgroundImage: {
  //   width: "100%",
  // },
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
    // backgroundColor: theme.palette.background.default,
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

  toolbar: theme.mixins.toolbar,
}));

const url = runtimeEnv().REACT_APP_API_URL;

function App(props) {
  const [theme, setTheme] = useState(true);
  let selectedTheme = theme ? light : dark;
  const appliedTheme = createMuiTheme({ ...selectedTheme, ...overrides });
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
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
      .catch((err) => console.log(err));
  };

  const handleLogin = (user) => {
    setUser(user);
    setSlackTeam(user.slack_team);
    setLoggedIn(true);
    fetchCoworkers();
    // fetchAndUpdateChannels();
    // fetchSlackUsers();
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    let status = token ? true : false;
    setLoggedIn(status);
  };

  const handleLogout = () => {
    // fetchAndUpdateChannels();
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

  const updateFeedback = (evt, target, feedback) => {
    evt.preventDefault();
    const token = localStorage.getItem("token");
    const id = target["row"]["id"];
    fetch(`${url}/reviews/${id}`, {
      method: "PATCH",
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
    <MuiThemeProvider theme={appliedTheme}>
      <CssBaseline />

      <div className={classes.root}>
        <Router>
          <>
            <Sidebar
              isLoggedIn={isLoggedIn}
              organization={user.organization}
              handleLogout={handleLogout}
              setTheme={() => setTheme(!theme)}
              icon={icon}
            />
          </>
          <div
            className={classes.content}
            style={{ backgroundImage: `url(${Background})` }}
          >
            <main>
              <div className={classes.toolbar} />
              <AppRouter
                authenticateSlack={authenticateSlack}
                slackTeam={slackTeam}
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
                coworkers={coworkers}
                user={user}
                updateTeam={updateTeam}
                submitFeedback={submitFeedback}
                updateFeedback={updateFeedback}
                handleLogin={handleLogin}
                requestFeedback={requestFeedback}
              />
            </main>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
