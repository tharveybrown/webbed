import React, { useState, useEffect } from "react";
import "../App.css";
// import Header from "../Header";
import SignInForm from "./Register/SignInForm";
import LoginForm from "./Login/LoginForm";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
// import Register from "../Register";
// import Login from "../Login";

/*components required to use material-ui*/
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

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

const url = runtimeEnv().REACT_APP_API_URL;

function App(props) {
  const [user, setUser] = useState({});
  const [form, setForm] = useState("");
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

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
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
      <Router>
        <Switch>
          {/* Routing according to the path entered */}
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/register"
            component={() => <SignInForm handleLogin={handleLogin} />}
            render={(props) => (
              <SignInForm
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
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
