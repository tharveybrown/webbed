import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Alert from "@material-ui/lab/Alert";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
  },
  tertiaryHeading: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.primary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "50%",
  },
  actionColumn: {
    flexBasis: "50%",
    margin: theme.spacing(1),
    // margin: theme.spacing(8),
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ChannelAccordion(props) {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
  });

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography
              className={classes.heading}
              variant="button"
              display="block"
              gutterBottom
            >
              #{props.channel["name"]}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              Members: {props.channel["num_members"]}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {props.channel["topic"]}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}> </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          {props.messages ? (
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                size="large"
                disabled={props.loading}
                className={buttonClassname}
                onClick={() => {
                  props.fetchKeyWords(props.channel["id"]);
                }}
                color="primary"
              >
                RUN ANALYSIS
              </Button>
              {props.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          ) : (
            <>
              <Alert className={classes.actionColumn} severity="warning">
                You need to invite Webbed bot to this channel.
              </Alert>
              <CopyToClipboard
                className={classes.actionColumn}
                text="/invite @webbed"
              >
                <Button size="small" color="primary">
                  Copy invite message
                </Button>
              </CopyToClipboard>
            </>
          )}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
