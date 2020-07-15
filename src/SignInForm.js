import React, { useState } from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const url = runtimeEnv().REACT_APP_API_URL;

function SignInForm(props) {
  const initialInputState = { email: "", password: "" };
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { email, password } = eachEntry;

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleUsernameChange = (evt) => {
  //   setUsername(evt.target.value);
  // };

  // const handlePasswordChange = (evt) => {
  //   setPassword(evt.target.value);
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // debugger;
    fetch(`${url}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        props.handleLogin(data.user);
      });
    // setUsername("");
    // setPassword("");
  };
  const formDivStyle = {
    margin: "auto",
    padding: "20px",
    width: "80%",
  };

  return (
    <div style={formDivStyle}>
      <h1>Sign Up</h1>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input
            name="email"
            value={email}
            onChange={handleInputChange}
            type="text"
            placeholder="username"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            name="password"
            value={password}
            onChange={handleInputChange}
            type="password"
            placeholder="password"
          />
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
