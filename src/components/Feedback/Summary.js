import { makeStyles, withStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";

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

class Table extends React.Component {
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
          let given = res.filter((r) => !r.pending);
          let pending = res.filter((r) => r.pending);
          this.setState({
            given: given,
            pending: pending,
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
          this.setState({
            received: res,
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
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
              endIcon={<ArrowRightAltRoundedIcon />}
              component={Link}
              to="/request"
            >
              Request Feedback
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
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
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(Table);
