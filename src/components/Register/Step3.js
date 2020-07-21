import React from "react";
import { Paper, Chip, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
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
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
}));

function Step3(props) {
  const classes = useStyles();

  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <div margin="normal" className={classes.root} required fullwidth>
      {/* <Paper component="ul" className={classes.root}> */}
      <Typography component="h3" variant="h5">
        Select up to 6 skills
      </Typography>
      <Typography component="h4" variant="h5">
        you want feedback on
      </Typography>
      {props.skillOptions.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              // icon={<Icon className="fa fa-flag" />}
              name="skills"
              value={data.label}
              clickable
              color={data.color}
              className={classes.chip}
              onClick={(e) => props.handleChipClick(data, e)}
              variant="outlined"
            />
          </li>
        );
      })}
      <a
        href={`https://slack.com/oauth/v2/authorize?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&scope=channels:history,channels:read,groups:read,users.profile:read,users:read,users:read.email,chat:write&user_scope=channels:history,channels:read,groups:history,im:history`}
      >
        <img
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
        />
      </a>

      {/* </Paper> */}
    </div>
  );
}

export default Step3;
