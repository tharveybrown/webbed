import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import "font-awesome/css/font-awesome.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* {["Feedback", "Starred", "Send email", "Drafts"].map((text, index) => ( */}
        <ListItem button key="Dashboard" component={Link} to="/dashboard">
          <ListItemIcon>
            <QuestionAnswerIcon style={{ fontSize: 40 }} />

            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* ))} */}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
