import React from "react";
import "./styles.css";
import data from "./omni.csv";

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
  let saturation = Math.abs(value[1]);
  // console.log(hue, saturation);
  boxes.push(`hsl(${hue}, ${saturation}%, 50%`);
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
      {/* viewBox="x y width height" -- width can be anything, height must be height of boxes. */}
      {/* width == height -> square */}
      <svg
        id="chart"
        viewBox={`0 0 ${boxes.length} ${boxes.length}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {boxes.map((color, i) => (
          <rect x={i} y="0" width="100%" height="100%" fill={color} />
        ))}
      </svg>
      <button onClick={this.handleClick}>Download Image</button>
    </div>
  );
}
