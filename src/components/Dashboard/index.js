import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
/*It is created as a component function in the react hooks.*/
function Dashboard({ handleLogout, isLoggedIn }) {
  return (
    <div>
      <h2>Dashboard Component</h2>
      {isLoggedIn ? (
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="secondary"
          component={Link}
          to="/login"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : null}
    </div>
  );
}

export default Dashboard; /*we export to access other files.*/
