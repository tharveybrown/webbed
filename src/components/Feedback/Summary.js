import { makeStyles, withStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import Typography from "@material-ui/core/Typography";
import Table from "./Table";

const url = runtimeEnv().REACT_APP_API_URL;

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  paper: {
    height: 400,
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#00be58",
    "&:hover": {
      backgroundColor: "#008c2b",
      color: "#FFFFFF",
    },
  },
});

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      received: [],
      given: [],
      pending: [],
      errors: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${url}/feedback/given`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            return this.setState((prevState) => ({
              errors: [...prevState.errors, res.errors],
            }));
          }

          this.setState({
            given: res,
          });
        });
      fetch(`${url}/feedback/received`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            return this.setState((prevState) => ({
              errors: [...prevState.errors, res.errors],
            }));
          }
          let pending = res.filter((r) => r.pending);
          let received = res.filter((r) => !r.pending);
          this.setState({
            received: received,
            pending: pending,
          });
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="space-evenly"
        alignItems="stretch"
        direction="row"
        className={classes.root}
        spacing={5}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              direction="row"
              justify="space-between"
              alignItems="center"
              container
              className={classes.root}
              xs={12}
              spacing={2}
            >
              <Grid item xs={4}>
                <Typography variant="h4" gutterBottom>
                  Received Feedback
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  // className={classes.root}
                  endIcon={<ArrowRightAltRoundedIcon />}
                  component={Link}
                  to="/request"
                >
                  Request Feedback
                </Button>
              </Grid>
            </Grid>
            <Table feedback={this.state.received} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              direction="row"
              justify="space-between"
              alignItems="center"
              container
              className={classes.root}
              xs={12}
              spacing={2}
            >
              <Grid item xs={4}>
                <Typography variant="h4" gutterBottom>
                  Given Feedback
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="inherit"
                  className={classes.button}
                  endIcon={<ArrowRightAltRoundedIcon />}
                  component={Link}
                  to="/new"
                >
                  Give Feedback
                </Button>
              </Grid>
            </Grid>

            <Table feedback={this.state.given} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(Summary);
