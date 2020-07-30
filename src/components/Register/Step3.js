import React from "react";
import { Chip, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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
    </div>
  );
}

export default Step3;
