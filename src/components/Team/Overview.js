import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
// import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
// import { Link } from "react-router-dom";
// import runtimeEnv from "@mars/heroku-js-runtime-env";
// import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
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
}));

export default function TeamOverview(props) {
  const classes = useStyles();

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
        <Paper className={classes.paper}></Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}></Paper>
      </Grid>
    </Grid>
  );
}
