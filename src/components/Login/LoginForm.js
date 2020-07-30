import React, { useState } from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const url = runtimeEnv().REACT_APP_API_URL;

function LoginForm(props) {
  const { classes } = props;
  const initialInputState = { email: "", password: "" };
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { email, password } = eachEntry;
  const [errors, setErrors] = useState([]);

  const redirect = () => {
    props.history.push("/dashboard");
  };

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`${url}/login`, {
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
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          props.handleLogin(data);
          return redirect();
        }
        setErrors(data.errors);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            to="/"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            component={Link}
            to="/register"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
        {errors ? (
          <ul>
            {errors.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        ) : null}
      </Paper>
    </main>
  );
}
export default withRouter(withStyles(styles)(LoginForm));
