import React from "react";
import { render } from "@testing-library/react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Logout(props) {
  return (
    <Button
      type="submit"
      // variant="outlined"
      variant="contained"
      color="warning"
      component={Link}
      to="/login"
      onClick={props.handleLogout}
    >
      Logout
    </Button>
  );
}
