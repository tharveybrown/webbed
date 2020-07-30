import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";

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
});

class NewFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      targetEmployee: {},
      showSkills: false,
      skill: "",
      feedback: "",
      rating: null,
    };
  }

  componentDidMount() {
    if (this.props.location.defaultValues) {
      let values = this.props.location.defaultValues["row"];
      this.setState({
        showSkills: true,
        targetEmployee: values["reviewed_employee"],
        skill: values["skill"],
      });
    }
  }
  handleSearchChange = (evt, value) => {
    if (value == null) {
      this.setState({
        showSkills: false,
        targetEmployee: {},
      });
    } else {
      this.setState({
        targetEmployee: value,
        showSkills: true,
      });
    }
  };

  handleSkillSelection = (evt, value) => {
    this.setState({
      skill: value.description,
    });
  };

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSkillChange = (evt, value) => {
    this.setState({
      rating: value,
    });
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
          onSubmit={(event) => {
            {
              this.props.location.defaultValues
                ? this.props.handleUpdate(
                    event,
                    this.props.location.defaultValues,
                    this.state
                  )
                : this.props.handleSubmit(event, this.state);
            }
          }}
        >
          <Typography variant="h4" gutterBottom>
            Feedback Form
          </Typography>
          <FormControl>
            {this.props.location.defaultValues ? (
              <TextField
                disabled
                style={{ width: 400 }}
                id="filled-disabled"
                label={this.state.skill}
                defaultValue={this.state.skill}
                variant="filled"
              />
            ) : (
              <Autocomplete
                id="combo-box-demo"
                options={this.props.coworkers}
                getOptionLabel={(option) => option.email}
                onChange={this.handleSearchChange}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Select User"
                    variant="outlined"
                  />
                )}
              />
            )}
          </FormControl>
          {this.state.showSkills ? (
            <div>
              <FormControl>
                {this.props.location.defaultValues ? (
                  <TextField
                    disabled
                    style={{ width: 400 }}
                    id="filled-disabled"
                    label={this.state.targetEmployee.email}
                    defaultValue={this.state.targetEmployee.email}
                    variant="filled"
                  />
                ) : (
                  <Autocomplete
                    id="combo-box-demo"
                    options={this.state.targetEmployee.skills}
                    getOptionLabel={(option) => option.description}
                    // defaultValue={this.state.skill}
                    onChange={this.handleSkillSelection}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Select Skill"
                        variant="outlined"
                      />
                    )}
                  />
                )}
              </FormControl>
              <FormControl component="fieldset" className={classes.button}>
                <FormLabel component="legend">Rating</FormLabel>
                <ToggleButtonGroup
                  orientation="vertical"
                  value={this.state.rating}
                  exclusive
                  style={{ width: 200, margin: "inherit" }}
                  onChange={this.handleSkillChange}
                >
                  <ToggleButton
                    value={5}
                    aria-label="list"
                    // style={{ backgroundColor: "#5bf287" }}
                  >
                    <ArrowUpwardRoundedIcon style={{ color: "#00be58" }} />
                    5/5 Excellent
                  </ToggleButton>

                  <ToggleButton
                    color="secondary"
                    value={4}
                    labelStyle={{ color: "white" }}
                  >
                    <ExpandLessRoundedIcon style={{ color: "#5bf287" }} />
                    4/5 Great
                  </ToggleButton>
                  <ToggleButton value={3} className="three-score">
                    <ArrowRightRoundedIcon color="default" />
                    3/5 Satisfactory
                  </ToggleButton>
                  <ToggleButton value={2} aria-label="quilt">
                    <ExpandMoreRoundedIcon style={{ color: "#c8b900" }} />
                    2/5 Okay
                  </ToggleButton>
                  <ToggleButton value={1} aria-label="quilt">
                    <ArrowDownwardRoundedIcon color="secondary" />
                    1/5 Poor
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
            </div>
          ) : null}
          <FormControl>
            <TextField
              id="outlined-multiline-flexible"
              label="Feedback"
              name="feedback"
              value={this.state.feedback}
              onChange={this.handleInputChange}
              multiline
              rows={4}
              style={{ width: 400 }}
              fullWidth
              variant="outlined"
            />
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
              Submit Feedback
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewFeedback);
