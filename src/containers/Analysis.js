import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  fetchAccountAttributeAndMetadata,
  fetchTopChannelAttributes,
  fetchChannelKeywords,
  isLoggedIn,
} from "../services";
import AnalysisChart from "./AnalysisChart";
import SearchChannels from "./SearchChannels";
import ChannelAccordion from "./ChannelAccordion";
import KeywordChart from "./KeywordChart";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Widget from "../components/Team/Widget";
import useStyles from "../components/Team/styles";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  paper: {
    height: 420,
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#00be58",
    "&:hover": {
      backgroundColor: "#008c2b",
      color: "#FFFFFF",
    },
  },
});

class Analysis extends Component {
  state = {
    showTopChannels: false,
    activeIndex: 0,
    channel: {},
    topChannels: [],
    isPanelLoading: true,
    numberOfHandles: 0,
    keywords: [],
    entities: [],
    nlpLoading: false,
    nlpSuccess: false,
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
    if (!isLoggedIn()) {
      this.props.history.push("/login");
    } else {
      window.scrollTo(0, 0);
      this.handleKeywordSearch();
    }

    // this._loadAsyncAnalysis();
  }

  fetchKeyWords = (id) => {
    this.setState({
      nlpLoading: true,
      nlpSuccess: false,
    });
    fetchChannelKeywords(id).then((res) => {
      this.setState({
        entities: res.entities,
        keywords: res.keywords,
        showTopChannels: false,
        nlpLoading: false,
        nlpSuccess: true,
        // topChannels: [],
      });
    });
  };

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

  handleKeywordSearch = () => {
    if (!this.state.topChannels.length > 0) {
      fetchTopChannelAttributes().then((res) => {
        this.setState({
          topChannels: res.topChannels,
        });
      });
    }
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
    console.log("SHOW TOP CHNNELS", this.state.showTopChannels);
    const { activeIndex } = this.state;
    const { classes } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Widget
            title="Select a Slack channel to run personality insights."
            upperTitle
            className={classes.card}
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
        <Grid item xs={12}>
          <Widget
            title="Identify top channel keywords."
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                this.handleKeywordSearch();
                this.setState({
                  showTopChannels: true,
                });
              }}
            >
              Run
            </Button>
            {this.state.keywords.length > 0 ? (
              <KeywordChart
                title="Keyword analysis"
                label="keyword"
                analysis={this.state.keywords}
              />
            ) : null}
            {this.state.topChannels.length && this.state.showTopChannels == true
              ? this.state.topChannels.map((channel) => (
                  <ChannelAccordion
                    success={this.state.nlpSuccess}
                    loading={this.state.nlpLoading}
                    fetchKeyWords={this.fetchKeyWords}
                    channel={channel["channel"]}
                    messages={channel["messages"]}
                  />
                ))
              : null}
            {!this.state.showTopChannels && this.state.entities.length > 0 ? (
              <KeywordChart
                title="Entity analysis"
                label="entity"
                analysis={this.state.entities}
              />
            ) : null}
          </Widget>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Analysis);
