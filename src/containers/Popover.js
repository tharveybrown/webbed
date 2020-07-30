import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ChannelPopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <label htmlFor="icon-button-file">
        <IconButton
          aria-describedby={id}
          color="primary"
          onClick={handleClick}
          component="span"
        >
          <InfoOutlinedIcon />
        </IconButton>
      </label>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Typography className={classes.typography}>
          Can't find a channel?
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.margin}
            onClick={props.fetchAndUpdate}
          >
            Update channels
          </Button>
        </Typography>
      </Popover>
    </div>
  );
}
