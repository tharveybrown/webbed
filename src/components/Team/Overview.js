import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import Widget from "./Widget";
import EditableTable from "./EditableTable";
import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import useStyles from "./styles";
import AddDialog from "./AddDialog";
export default function TeamOverview(props) {
  const { coworkers, slackUsers, jobType, isLoggedIn, updateTeam } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {props.jobType == "Employee" ? null : (
          <Grid item xs={12}>
            {/* <Widget
            title="Your team"
            // upperTitle
            // className={classes.card}
            bodyClass={classes.fullHeightBody}
          > */}
            <EditableTable
              data={coworkers.team}
              team={coworkers.coworkers}
              updateTeam={updateTeam}
            />
            {/* </Widget> */}
          </Grid>
        )}
        <Grid item xs={12}>
          {coworkers.manager ? (
            <Widget
              title="Your manager"
              upperTitle
              className={classes.card}
              bodyClass={classes.fullHeightBody}
            >
              <div>{coworkers.manager.first_name}</div>
            </Widget>
          ) : (
            <Widget
              // title="Add Manager"
              upperTitle
              className={classes.card}
              bodyClass={classes.fullHeightBody}
            >
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                  // className={classes.root}
                  endIcon={<AddCircleOutlineRoundedIcon />}
                  // component={Link}
                  // to="/request"
                >
                  Add Manager
                </Button>
                <AddDialog
                  open={open}
                  updateTeam={updateTeam}
                  target="manager"
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  team={coworkers.coworkers}
                  // team={coworkers.coworkers.map(
                  //   (c) => !coworkers.team.includes(c)
                  // )}
                />
              </Grid>
            </Widget>
          )}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
        container
        justify="space-evenly"
        alignItems="stretch"
        direction="column"
        className={classes.root}
        spacing={5}
      >
        
      </Grid> */}
    </div>
  );
}
