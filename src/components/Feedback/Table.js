import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 400,
    // width: 300,
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

export default function Table(props) {
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
      <Grid item xs={12}>
        <Paper className={classes.paper}></Paper>
      </Grid>
    </Grid>
  );
}
