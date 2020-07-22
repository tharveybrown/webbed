import React from "react";

import { Link } from "react-router-dom";
import { Paper, Button } from "@material-ui/core";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import SideBar from "../Layout/Sidebar";
import Toolbar from "@material-ui/core/Toolbar";
const url = runtimeEnv().REACT_APP_API_URL;
const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

// const dotenv = require("dotenv");

/*It is created as a component function in the react hooks.*/
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slackId: "",
      slackName: "",
      slackUsers: [],
      slackChannels: [],
      loading: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (this.props.slackId) {
      this.setState({
        slackId: this.props.slackId,
      });
    }
    // let access_token = localStorage.getItem("slack_token");

    if (this.props.location.search) {
      this.setState({ loading: true });
      fetch(`${url}/auth/callback/${this.props.location.search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("slack_token", res.slack_token);

          this.setState({
            slackId: res.slack.slack_id,
            slackName: res.slack.name,
            slackChannels: res.slack.channels,
            slackUsers: res.slack.slack_users,
            loading: false,
          });
          this.props.history.push("/dashboard");
        });
    }
    if (token) {
      this.setState({ loading: true });
      fetch(`${url}/slack/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            slackId: res.slack.slack_id,
            slackName: res.slack.name,
            slackChannels: res.slack.channels,
            slackUsers: res.slack.slack_users,
            loading: false,
            loading: false,
          });
          this.props.history.push("/dashboard");
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <SideBar />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {this.state.slackName ? <h2>{this.state.slackName}</h2> : null}
          {this.props.isLoggedIn ? (
            <Paper>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                component={Link}
                to="/login"
                onClick={this.props.handleLogout}
              >
                Logout
              </Button>
              <div className={classes.wrapper}>
                <a
                  href={`https://slack.com/oauth/v2/authorize?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&scope=channels:history,channels:read,groups:read,users.profile:read,users:read,users:read.email,chat:write&user_scope=channels:history,channels:read,groups:history,im:history&redirect_uri=http://localhost:3000/dashboard`}
                >
                  <img
                    alt="Add to Slack"
                    height="40"
                    width="139"
                    src="https://platform.slack-edge.com/img/add_to_slack.png"
                    srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                  />
                  {this.state.loading && (
                    <CircularProgress
                      size={38}
                      className={classes.fabProgress}
                    />
                  )}
                </a>
              </div>
            </Paper>
          ) : null}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
