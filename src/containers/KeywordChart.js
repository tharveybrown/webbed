import React, { Component } from "react";

import PropTypes from "prop-types";
// import uuid from "uuid";
import { Bar, defaults } from "react-chartjs-2";
import { Table, Header, Message, Icon } from "semantic-ui-react";

defaults.global.defaultFontColor = "#90A4AE";

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
    labels: this.props.analysis.map((data) => data[this.props.label]),

    datasets: [
      {
        label: "Sadness",
        backgroundColor: "rgba(153, 102, 255, 0.6)",

        data: this.buildEmotions("sadness"),
        stack: 2,
      },
      {
        label: "Joy",
        backgroundColor: "#82B1FF",
        data: this.buildEmotions("joy"),
        stack: 2,
      },
      {
        label: "Fear",
        backgroundColor: "#FFAB40",

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
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        data: this.buildEmotions("anger"),
        stack: 2,
      },
      {
        label: "Sentiment",
        type: "bar",
        backgroundColor: "#78909C",
        data: this.props.analysis.map((data) => data["sentiment"]["score"]),
        stack: 1,
      },
    ],
  });

  options = {
    maintainAspectRatio: false,
    legend: {
      position: "top",
      labels: {
        fontColor: "#B0BEC5",
      },
    },
    title: {
      display: true,
      text: this.props.title,
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
