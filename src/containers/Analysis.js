import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { fetchAccountAttributeAndMetadata } from "../services";
import AnalysisChart from "./AnalysisChart";
import SearchChannels from "./SearchChannels";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Widget from "../components/Team/Widget";
import useStyles from "../components/Team/styles";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

const styles = useStyles;

class Analysis extends Component {
  state = {
    activeIndex: 0,
    channel: {},

    isPanelLoading: true,
    numberOfHandles: 0,
    analysis: {
      personality: {},
      // needs: {},
      // values: {},
      // "consumption preferences": {}
    },
    analysisAverages: {
      personality: {},
      // needs: {},
      // values: {},
      // "consumption preferences": {}
    },
    analysisDescription: {
      personality: {},
      // needs: {},
      // values: {},
      // "consumption preferences": {}
    },
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    // this._loadAsyncAnalysis();
  }

  // handleTabChange = (e) => {
  //   const twitterHandleId = this.props.match.params.id;
  //   const attribute = e.target.text;

  // };

  handleBack = () => {
    this.props.history.push("/start");
  };

  handleSearchSubmit = (channel) => {
    this.setState(
      {
        channel: channel,
      },
      () => {
        this._loadAsyncAnalysis();
      }
    );
  };
  _loadAsyncAnalysis = () => {
    const selectedAttribute = "personality";
    let channel = this.state.channel;
    fetchAccountAttributeAndMetadata(
      channel.id,
      this._formatFetchAttribute(selectedAttribute)
    ).then((res) => {
      if (res.attributeAnalysis && res.analysisMetadata) {
        let analysis = this.state.analysis;
        let attributeAnalysis = res.attributeAnalysis;

        analysis[selectedAttribute] = attributeAnalysis;
        let analysisAverages = this.state.analysisAverages;
        analysisAverages[selectedAttribute] = res.analysisMetadata;

        let analysisDescription = this.state.analysisDescription;
        const description_key = Object.keys(
          analysisAverages[selectedAttribute]
        ).find((k) => k.includes("description"));
        analysisDescription[selectedAttribute] =
          res.analysisMetadata[description_key];

        this.setState({
          analysis,
          analysisAverages,
          analysisDescription,
          isPanelLoading: false,
        });
      }
    });
  };

  _formatFetchAttribute = (attribute) => {
    switch (attribute) {
      case "personality":
        return "personalities";
      // case "needs":
      // 	return "needs";
      // case "values":
      // 	return "values";
      // case "consumption preferences":
      // 	return "consumption_preferences";
      default:
        return null;
    }
  };

  render() {
    console.log(this.state.analysis["personality"]);
    console.log(
      "TRUE OR FALSE",
      Object.keys(this.state.analysis["personality"]).length > 0
    );

    const { activeIndex } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Widget
            upperTitle
            // className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <SearchChannels handleSearchSubmit={this.handleSearchSubmit} />
            {Object.keys(this.state.analysis["personality"]).length > 0 ? (
              <AnalysisChart
                attribute={"Personality"}
                analysis={this.state.analysis["personality"]}
                description={this.state.analysisDescription["personality"]}
                analysisAverages={this.state.analysisAverages["personality"]}
                redColoring={255}
                greenColoring={0}
                blueColoring={0}
              />
            ) : null}
          </Widget>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Analysis);
