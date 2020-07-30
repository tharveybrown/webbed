import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor={props.first_name_name}>
          {props.first_name_label}
        </InputLabel>
        {/* When the name field is changed, setName will run and assign the name to the value in the input. */}
        <Input
          id={props.first_name_name}
          name={props.first_name_name}
          autoComplete="off"
          autoFocus
          value={props.first_name}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor={props.last_name_name}>
          {props.last_name_label}
        </InputLabel>
        {/* When the name field is changed, setName will run and assign the name to the value in the input. */}
        <Input
          id={props.last_name_name}
          name={props.last_name_name}
          autoComplete="off"
          autoFocus
          value={props.last_name}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor={props.email_name}>{props.email_label}</InputLabel>
        {/* When the name field is changed, setName will run and assign the name to the value in the input. */}
        <Input
          id={props.email_name}
          name={props.email_name}
          autoComplete="off"
          autoFocus
          value={props.email}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor={props.password_name}>
          {props.password_label}
        </InputLabel>
        {/* When the name field is changed, setName will run and assign the name to the value in the input. */}
        <Input
          id={props.password_name}
          name={props.password_name}
          autoComplete="off"
          type="password"
          autoFocus
          value={props.password}
          onChange={props.handleInputChange}
        />
      </FormControl>
    </>
  );
}

export default Step1;
