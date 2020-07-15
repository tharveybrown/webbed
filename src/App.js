import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import SignInForm from "./SignInForm";
import LoginForm from "./LoginForm";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const url = runtimeEnv().REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState("");

  useEffect(() => {
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
          // console.log(data)
        });
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleFormSwitch = (input) => {
    setForm(input);
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

  console.log(user);

  const renderForm = () => {
    switch (form) {
      case "login":
        return <LoginForm handleLogin={handleLogin} />;
        break;
      default:
        return <SignInForm handleLogin={handleLogin} />;
    }
  };
  return (
    <div className="App">
      <Header handleFormSwitch={handleFormSwitch} />
      {renderForm()}
      <button onClick={handleAuthClick} className="ui button">
        Access Authorized Route
      </button>
    </div>
  );
}

export default App;
