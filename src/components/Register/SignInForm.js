import React, { useState } from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import {
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
const url = runtimeEnv().REACT_APP_API_URL;

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const skillOptions = [
  { key: "Communication", label: "Communication" },
  { key: "Management", label: "Management" },
  { key: "Initiative", label: "Initiative" },
  { key: "CodeQuality", label: "Code Quality" },
  { key: "Leadership", label: "Leadership" },
  { key: "Resilience", label: "Resilience" },
  { key: "AnalyticalThinking", label: "Analytical Thinking" },
  { key: "Design Thinking", label: "Design Thinking" },
  { key: "Responsiveness", label: "Responsiveness" },
  { key: "Candor", label: "Candor" },
];

class SignInForm extends React.Component {
  // const { classes } = this.props;

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      organization: "",
      skills: [],
    };
  }
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }

  handleInputChange = (e) => {
    // debugger;
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChipClick = (skill, evt) => {
    console.log(this.state);
    const index = this.state.skills.indexOf(skill.label);
    // debugger;
    if (index > -1) {
      evt.target.parentElement.style.backgroundColor = "#FFFFFF";
      evt.target.style.color = "rgba(0, 0, 0, 0.87)";
      let arr = this.state.skills.filter((item) => item !== skill.label);
      this.setState({
        skills: arr,
      });
    } else {
      evt.target.parentElement.style.backgroundColor = "#3f51b5";
      evt.target.style.color = "#FFFFFF";
      this.setState((previousState) => {
        return {
          skills: [...previousState.skills, skill.label],
        };
      });
    }
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    const {
      email,
      password,
      first_name,
      last_name,
      skills,
      organization,
      role,
    } = this.state;
    // debugger;
    fetch(`${url}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        organization,
        skills,
        role,
        email,
        password,
        first_name,
        last_name,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          this.props.handleLogin(data);
          this.props.history.push("/dashboard");
        }
      });
  };
  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <Button
          style={{ float: "left" }}
          type="button"
          onClick={this._prev}
          variant="outlined"
        >
          Previous
        </Button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        // <Grid
        //   container
        //   alignItems="flex-start"
        //   justify="flex-end"
        //   direction="row"
        // >
        <Button
          style={{ float: "right" }}
          onClick={this._next}
          variant="outlined"
          color="primary"
        >
          Next
        </Button>
        // </Grid>
      );
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      organization,
    } = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Account
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Step1
              first_name={first_name}
              first_name_label="First Name"
              first_name_name="first_name"
              last_name={last_name}
              last_name_label="Last Name"
              last_name_name="last_name"
              email={email}
              email_label="Email"
              email_name="email"
              password={password}
              password_label="Password"
              password_name="password"
              handleInputChange={this.handleInputChange}
              currentStep={this.state.currentStep}
            />
            <Step2
              organization={organization}
              organization_label="Organization Name"
              organization_name="organization"
              role={role}
              role_name="role"
              classes={classes}
              role_label="role-label"
              handleInputChange={this.handleInputChange}
              currentStep={this.state.currentStep}
            />
            <Step3
              skillOptions={skillOptions}
              handleChipClick={this.handleChipClick}
              handleDelete={this.handleDelete}
              currentStep={this.state.currentStep}
            />
            {this.previousButton()}
            {this.nextButton()}
            {this.state.currentStep === 3 ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              className={classes.submit}
            >
              Go back to Login
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(SignInForm));
