import React from "react";
import "./styles.css";
import data from "./omni.csv";

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
  return (
    <div className="App">
      {/* viewBox="x y width height" -- width can be anything, height must be height of boxes. */}
      {/* width == height -> square */}
      <svg
        viewBox={`0 0 ${boxes.length} ${boxes.length}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {boxes.map((color, i) => (
          <rect x="0" y={i} width="100%" height="1" fill={color} />
        ))}
      </svg>
    </div>
  );
}
