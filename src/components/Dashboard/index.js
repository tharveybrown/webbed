import React from "react";

import { Link } from "react-router-dom";
import { Paper, Button } from "@material-ui/core";

// const dotenv = require("dotenv");

/*It is created as a component function in the react hooks.*/
function Dashboard({ handleLogout, isLoggedIn }) {
  const token = localStorage.getItem("token");
  const handleSlackAuth = () => {
    if (token) {
      fetch(
        `https://slack.com/oauth/v2/authorize?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&scope=channels:history,channels:read,groups:read,users.profile:read,users:read,users:read.email,chat:write&user_scope=channels:history,channels:read,groups:history,im:history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(console.log);
    }
  };

  return (
    <div>
      <h2>Dashboard Component</h2>
      {isLoggedIn ? (
        <Paper>
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
          <Button onClick={handleSlackAuth}>Add To Slack</Button>
          <a
            href={`https://slack.com/oauth/v2/authorize?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&scope=channels:history,channels:read,groups:read,users.profile:read,users:read,users:read.email,chat:write&user_scope=channels:history,channels:read,groups:history,im:history&token=${token}`}
          >
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
        </Paper>
      ) : null}
    </div>
  );
}

export default Dashboard;
