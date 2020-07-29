import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";

export default function AddDialog(props) {
  const [employeeToAdd, setEmployeeToAdd] = useState({});
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
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
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.updateTeam(employeeToAdd, "add", props.target);
            props.handleClose();
          }}
          color="primary"
        >
          Add to team
        </Button>
      </DialogActions>
    </Dialog>
  );
}
