import React from "react";
import {
  FormControl,
  Input,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function Step2(props) {
  const classes = useStyles();

  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className={classes.root}>
      <FormControl
        className={props.classes.formControl}
        margin="normal"
        required
        fullWidth
      >
        <InputLabel id={props.role_label}>Role</InputLabel>
        <Select
          labelId={props.role_label}
          id="role-select"
          name={props.role_name}
          value={props.role}
          onChange={props.handleInputChange}
        >
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Employee">Employee (not manager)</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        className={props.classes.formControl}
        margin="normal"
        required
        fullWidth
      >
        <InputLabel htmlFor={props.organization_name}>
          {props.organization_label}
        </InputLabel>
        {/* When the name field is changed, setName will run and assign the name to the value in the input. */}
        <Input
          id={props.organization_name}
          name={props.organization_name}
          autoComplete="off"
          autoFocus
          value={props.organization}
          onChange={props.handleInputChange}
        />
      </FormControl>

      {/* </FormControl> */}
    </div>
  );
}

export default Step2;
