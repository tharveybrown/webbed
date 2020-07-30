import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Switch,
  Grid,
  Button as MaterialButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { useEditor } from "@craftjs/core";

const Topbar = ({ onLoadState }) => {
  const [snackbarMessage, setSnackbarMessage] = useState();

  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item xs>
          <FormControlLabel
            className="enable-disable-toggle"
            control={<Switch />}
            label="Enable"
          />
        </Grid>
        <Grid item>
          <MaterialButton
            className="load-state-btn"
            size="small"
            variant="outlined"
            color="secondary"
          >
            Load
          </MaterialButton>

          <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={!!snackbarMessage}
            onClose={() => setSnackbarMessage(null)}
            message={<span>{snackbarMessage}</span>}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Topbar;
