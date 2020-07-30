import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import triangle from "./triangle.svg";

import { Link } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  profileButton: {
    // justifyContent: "space-between",

    marginLeft: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const { organization, isLoggedIn, handleLogout, icon, setTheme } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const propfileOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {isLoggedIn ? (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.profileButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <img src={triangle} className="App-logo" alt="logo" />
              <Typography style={{ flex: 1 }} variant="h3" noWrap>
                Webbed
              </Typography>
              <Typography
                className={classes.toolbar}
                style={{ align: "center" }}
                variant="h4"
                noWrap
              >
                {organization ? organization["name"] : null}
              </Typography>

              <div>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="mode"
                  className={classes.profileButton}
                  onClick={() => setTheme(!theme)}
                >
                  {icon}
                </IconButton>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  className={classes.profileButton}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  keepMounted
                  open={propfileOpen}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/login" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            {/* {isLoggedIn ? ( */}
            <>
              <List>
                {/* {["Feedback", "Starred", "Send email", "Drafts"].map((text, index) => ( */}
                <ListItem
                  button
                  key="Dashboard"
                  component={Link}
                  to="/dashboard"
                >
                  <ListItemIcon>
                    <HomeRoundedIcon style={{ fontSize: 30 }} />

                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                {/* ))} */}
              </List>
              <Divider />
              <List>
                <ListItem button key="Feedback" component={Link} to="/feedback">
                  <ListItemIcon>
                    <QuestionAnswerRoundedIcon style={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary="Feedback" />
                </ListItem>
              </List>
              <List>
                <ListItem button key="Feedback" component={Link} to="/team">
                  <ListItemIcon>
                    <GroupRoundedIcon style={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </ListItem>
              </List>
            </>
            {/* ) : null} */}
          </Drawer>
        </>
      ) : null}
    </div>
  );
}
