import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FullscreenExit } from "@material-ui/icons";
const url = runtimeEnv().REACT_APP_API_URL;
const token = localStorage.getItem("token");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // margin: theme.spacing(1),
  },
  button: {
    display: "flex",
    margin: theme.spacing(1),
  },
}));

export default function Asynchronous(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedChannel, setSelectedChannel] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const loading = open && options.length === 0;

  const searchChannels = () => {
    setOpen(true);
    console.log("OPTIONS", options);
    let active = true;

    if (open && options.length === 0) {
      return setLoading(false);
    }

    if (options.length === 0) {
      setLoading(true);
      fetch(`${url}/channels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setOptions(res["channels"]);
        });
    }

    return () => {
      active = false;
    };
  };

  return (
    <div className={classes.root}>
      {/* <div> */}
      <Autocomplete
        id="channel-search"
        style={{ width: 400 }}
        open={open}
        onOpen={searchChannels}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, value) => {
          setSelectedChannel(value);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label="Select a channel"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          </>
        )}
      />
      <Button
        className={classes.button}
        onClick={() => {
          props.handleSearchSubmit(selectedChannel);
        }}
        color="primary"
        variant="outlined"
      >
        Select Channel
      </Button>
    </div>
  );
}
