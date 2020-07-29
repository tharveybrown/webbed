import React from "react";
import { Paper } from "@material-ui/core";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Analysis from "../../containers/Analysis";

const url = runtimeEnv().REACT_APP_API_URL;
const drawerWidth = 240;
const styles = (theme) => ({
  // root: {
  //   display: "flex",
  // },
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

    if (this.props.location.search) {
      this.setState({ loading: true });
      this.props.authenticateSlack(this.props.location.search);

      this.setState({
        loading: false,
      });
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { classes, slackTeam } = this.props;
    console.log("SLACK TEAM", slackTeam);

    return (
      <div>
        {/* {!!slackTeam ? <h2>{slackTeam.name}</h2> : null} */}
        {slackTeam === undefined ? (
          <Paper>
            <div className={classes.wrapper}>
              <a
                href={`https://slack.com/oauth/v2/authorize?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&scope=channels:history,channels:read,groups:read,users.profile:read,users:read,users:read.email,chat:write&user_scope=channels:history,channels:read,groups:history,im:history&redirect_uri=${process.env.REACT_APP_CLIENT_REDIRECT}`}
              >
                <img
                  alt="Add to Slack"
                  height="40"
                  width="139"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                />
                {this.state.loading && (
                  <CircularProgress size={38} className={classes.fabProgress} />
                )}
              </a>
            </div>
          </Paper>
        ) : (
          <Analysis />
        )}
        {/* </main> */}
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
