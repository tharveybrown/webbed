import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
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
    // height: 400,
    padding: theme.spacing(1),
    maxWidth: 600,
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
    };
  }

  handleSearchChange = (evt, value) => {
    console.log("VALUE", value);
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
            Feedback Form
          </Typography>
          <FormControl>
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
          </FormControl>
          {this.state.showSkills ? (
            <FormControl>
              <Autocomplete
                id="combo-box-demo"
                options={this.state.targetEmployee.skills}
                getOptionLabel={(option) => option.description}
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
            </FormControl>
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
              Go Back
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
