import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Widget from "./Widget";
import EditableTable from "./EditableTable";
import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import useStyles from "./styles";
import AddDialog from "./AddDialog";

import { isLoggedIn } from "../../services";
export default function TeamOverview(props) {
  const { coworkers, updateTeam } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!isLoggedIn()) {
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <Grid
        justify="space-evenly"
        alignItems="stretch"
        direction="row"
        container
        spacing={3}
      >
        {props.jobType === "Employee" ? null : (
          <Grid item xs={11}>
            <EditableTable
              data={coworkers.team}
              team={coworkers.coworkers}
              updateTeam={updateTeam}
            />
            {/* </Widget> */}
          </Grid>
        )}
        <Grid item xs={11}>
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
      </Grid>
    </div>
  );
}
