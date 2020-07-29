import React, { useState } from "react";
import MaterialTable from "material-table";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function MaterialTableDemo(props) {
  const classes = useStyles();
  const [employeeToAdd, setEmployeeToAdd] = useState({});
  const [state, setState] = useState({
    columns: [
      { title: "First Name", field: "first_name" },
      { title: "Last Name", field: "last_name" },
      { title: "Email", field: "email" },
      { title: "On Slack", field: "slack_id" },
    ],
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MaterialTable
        title="Your Team"
        columns={state.columns}
        data={props.data}
        actions={[
          {
            title: "",
            icon: () => <AddCircleOutlineRoundedIcon />,
            onClick: (event, rowData) => {
              handleClickOpen(event);
            },
            isFreeAction: true,
            tooltip: "Add Button",
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                props.updateTeam(oldData, "delete", "employee");
              }, 600);
            }),
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Search</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search members by email to add to your team.
          </DialogContentText>

          {props.team ? (
            <FormControl>
              <Autocomplete
                id="combo-box-demo"
                options={props.team}
                getOptionLabel={(option) => option.email}
                onChange={(event, value) => {
                  setEmployeeToAdd(value);
                }}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Select User"
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.updateTeam(employeeToAdd, "add", "employee");
              handleClose();
            }}
            color="primary"
          >
            Add to team
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
