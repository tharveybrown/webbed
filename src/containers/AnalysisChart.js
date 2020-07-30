import React, { Component } from "react";
import { Radar, defaults } from "react-chartjs-2";
import PropTypes from "prop-types";
// import uuid from "uuid";
import Link from "@material-ui/core/Link";
import { Table, Header, Message, Icon } from "semantic-ui-react";
defaults.global.defaultFontColor = "#90A4AE";

class AnalysisChart extends Component {
  buildLabels = (analysis) => {
    // debugger;
    let labels = Object.keys(this._serializeAnalysis(analysis)).map(
      (attribute) =>
        attribute.includes("_")
          ? attribute
              .split("_")
              .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
              .join(" ")
          : attribute.slice(0, 1).toUpperCase() + attribute.slice(1)
    );

    return labels;
  };

  buildData = (analysis) => {
    let data = Object.values(this._serializeAnalysis(analysis));
    return data;
  };

  chartData = () => ({
    labels: this.buildLabels(this.props.analysis),
    datasets: [
      {
        label: "Personalities",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        data: this.buildData(this.props.analysis),
      },
      {
        label: "Watson Averages",
        backgroundColor: "rgba(151,187,205,0.2)",
        pointBackgroundColor: "rgba(151,187,205,1)",
        hoverPointBackgroundColor: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: this.buildData(this.props.analysisAverages),
      },
    ],
  });

  options = {
    maintainAspectRatio: false,
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Radar Chart",
    },
    scale: {
      reverse: false,
      gridLines: {
        color: [
          "black",
          "red",
          "orange",
          "yellow",
          "green",
          "blue",
          "indigo",
          "violet",
        ],
      },
      ticks: {
        beginAtZero: true,
      },
    },
  };

  _serializeAnalysis = (analysis) => {
    delete analysis.id;
    delete analysis.channel_id;
    delete analysis.created_at;
    delete analysis.updated_at;
    return analysis;
  };

  render() {
    let tableRows = [];
    let descriptionLabels = Object.keys(this.props.description);
    descriptionLabels.sort((a, b) => {
      let textA = a.toUpperCase();
      let textB = b.toUpperCase();

      return textA.localeCompare(textB);
    });

    for (const label of descriptionLabels) {
      tableRows.push(
        <Table.Row>
          <Table.Cell>{label}</Table.Cell>
          <Table.Cell>{this.props.description[label]}</Table.Cell>
        </Table.Row>
      );
    }

    return (
      <div>
        <div style={{ margin: "1em 0em 4em" }}>
          {/* <Radar data={this.chartData} /> */}
          <Radar
            width={200}
            height={500}
            data={this.chartData}
            options={this.options}
          />
        </div>

        <Header as="h3" textAlign="center">
          Understanding IBM Wastson Personality Insights
        </Header>

        <Message attached="bottom">
          <Icon name="external" />
          <Link
            target="_blank"
            href="https://console.bluemix.net/docs/services/personality-insights/numeric.html#numeric"
          >
            Learn more about the scoring from IBM Watson.
          </Link>
        </Message>
      </div>
    );
  }
}

AnalysisChart.propTypes = {
  attribute: PropTypes.string.isRequired,
  // twitterHandle: PropTypes.string,
  // numberOfHandles: PropTypes.number,
  analysis: PropTypes.object,
  description: PropTypes.object,
  analysisAverages: PropTypes.object,
  redColoring: PropTypes.number.isRequired,
  greenColoring: PropTypes.number.isRequired,
  blueColoring: PropTypes.number.isRequired,
};

export default AnalysisChart;
