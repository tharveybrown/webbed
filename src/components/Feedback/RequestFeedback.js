import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import BusinessIcon from "../../"

import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    // flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: 600,
    margin: "auto",
  },

  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 400,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class RequestFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      targetEmployees: [],
      skill: "",
    };
  }

  handleSearchChange = (evt, value) => {
    console.log("VALUE", value);
  };

  // handleSkillSelection = (evt, value) => {
  //   this.setState({
  //     skill: value.description,
  //   });
  // };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // setPersonName(event.target.value);
  };

  render() {
    // const classes = styles();
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(event) => this.props.handleSubmit(event, this.state)}
        >
          <Typography variant="h4" gutterBottom>
            Request Feedback
          </Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Request an evaluation on any of your skills
            </FormLabel>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              name="targetEmployees"
              value={this.state.targetEmployees}
              onChange={this.handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {this.props.coworkers.map((emp) => (
                <MenuItem key={emp.id} value={emp.email}>
                  {emp.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              component={Link}
              to="/feedback"
              startIcon={<KeyboardBackspaceRoundedIcon />}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              endIcon={<ArrowRightAltRoundedIcon />}
            >
              Send Request
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RequestFeedback);
