import React, { Component } from "react";

import PropTypes from "prop-types";
// import uuid from "uuid";
import { Bar } from "react-chartjs-2";
import { Table, Header, Message, Icon } from "semantic-ui-react";

class KeywordChart extends Component {
  buildEmotions = (type) => {
    const emotions = this.props.analysis.map((e) => e.emotions);
    let flattenedEmotions = [];
    for (var i = 0; i < emotions.length; i++) {
      for (var j = 0; j < emotions[i].length; j++) {
        flattenedEmotions.push(emotions[i][j]);
      }
    }

    return flattenedEmotions.filter((e) => e[type]).map((e) => e[type]);
  };

  chartData = () => ({
    labels: this.props.analysis.map((data) => data["keyword"]),

    datasets: [
      {
        label: "Sadness",
        backgroundColor: "#C19CFF",
        data: this.buildEmotions("sadness"),
        stack: 2,
      },
      {
        label: "Joy",
        backgroundColor: "#8BD7D8",
        data: this.buildEmotions("joy"),
        stack: 2,
      },
      {
        label: "Fear",
        backgroundColor: "#FFBC76",

        data: this.buildEmotions("fear"),
        stack: 2,
      },
      {
        label: "Disgust",
        backgroundColor: "#FFDA78",
        data: this.buildEmotions("disgust"),
        stack: 2,
      },
      {
        label: "Anger",
        backgroundColor: "#FF89A2",
        data: this.buildEmotions("anger"),
        stack: 2,
      },
      {
        label: "Sentiment",
        type: "bar",
        backgroundColor: "#D0D2D5",
        data: this.props.analysis.map((data) => data["sentiment"]["score"]),
        stack: 1,
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
      text: "Keyword sentiment analysis",
    },

    scales: {
      yAxes: [
        {
          id: "stacked_testY",
          type: "linear",
          position: "left",
          stacked: true,
          display: true,
        },
      ],
      xAxes: [
        {
          position: "bottom",
          stacked: true,
          display: true,
        },
      ],
    },
  };

  render() {
    // if (this.props.analysis != {}) {
    // debugger;
    // }

    return (
      <div>
        <div style={{ margin: "1em 0em 4em" }}>
          {/* <Radar data={this.chartData} /> */}
          <Bar
            width={200}
            height={500}
            data={this.chartData}
            options={this.options}
          />
        </div>
      </div>
    );
  }
}

// AnalysisChart.propTypes = {
//   attribute: PropTypes.string.isRequired,
//   // twitterHandle: PropTypes.string,
//   // numberOfHandles: PropTypes.number,
//   analysis: PropTypes.object,
//   description: PropTypes.object,
//   analysisAverages: PropTypes.object,
//   redColoring: PropTypes.number.isRequired,
//   greenColoring: PropTypes.number.isRequired,
//   blueColoring: PropTypes.number.isRequired,
// };

export default KeywordChart;
