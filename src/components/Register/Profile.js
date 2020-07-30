import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import { isLoggedIn, deleteAccout } from "../../services/index";
import Paper from "@material-ui/core/Paper";
import Widget from "../Team/Widget";
import { Redirect } from "react-router-dom";
import Topbar from "./Topbar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(1),

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      // width: "25ch",
    },
  },
  form: {
    margin: theme.spacing(2),
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const { user } = props;
  if (!isLoggedIn()) {
    props.history.push("/login");
  }
  return (
    <div>
      {props.user.id ? (
        <>
          {/* <Topbar /> */}
          <Grid container>
            <Grid item xs={12}>
              <Widget
                title={user.first_name + " " + user.last_name}
                // upperTitle
                // className={classes.card}

                bodyClass={classes.fullHeightBody}
              >
                <Grid className={classes.root} item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    to="/login"
                    onClick={() => {
                      deleteAccout(props.user.id).then(() => {
                        localStorage.clear();
                        props.history.push("/register");
                      });
                    }}
                  >
                    Delete account
                  </Button>
                </Grid>
                {/* <Grid item>
                    
                  </Grid> */}
              </Widget>
            </Grid>
          </Grid>
        </>
      ) : null}
    </div>
  );
}
