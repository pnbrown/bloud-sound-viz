import React from "react";
import "./styles.css";
import data from "./forward.csv";
import * as d3 from "d3-scale";

const saveSvgAsPng = require("save-svg-as-png");

const imageOptions = {
  scale: 5,
  encoderOptions: 1,
  backgroundColor: "white"
};

const parsedData = data
  .split("\n") // split string to lines
  .map((e) => e.trim()) // remove white spaces for each line
  .map((e) => e.split(",").map((e) => parseFloat(e.trim()))); // split each line to array

let boxes = [];

for (const value of parsedData) {
  let hue = (value[0] / 22000) * 360;
  // need more granularity in the saturation. 10 dB should be much more significant
  var logScale = d3.scaleLog().domain([10, 100000]).range([0, 100]);
  let saturation = 100 - Math.abs(value[1]);
  let height = 100;
  // console.log(hue, saturation);
  boxes.push([`hsl(${hue}, ${saturation}%, 50%`, height, ...value]);
}

class ReactLogo extends React.Component {
  render() {
    return (
      // {/* viewBox="x y width height" -- width can be anything, height must be height of boxes. */}
      // {/* width == height -> square */}
      <svg
        id="chart"
        viewBox={`0 0 1023 ${boxes.length}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {boxes.map(([color, height, v1, v2], i) => (
          <rect x={i} y="0" width="100%" height="100%" fill={color}>
            <title>
              {[v1.toFixed(2) + " Hz", v2.toFixed(2) + " dB"].join(",")}
            </title>
          </rect>
        ))}
      </svg>
    );
  }
}

export default function App() {
  this.handleClick = () => {
    saveSvgAsPng.saveSvgAsPng(
      document.getElementById("chart"),
      "chart.png",
      imageOptions
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <ReactLogo />
        <button onClick={this.handleClick}>Download Image</button>
      </header>
    </div>
  );
}
