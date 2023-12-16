import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Presence", "Absences"],
  ["Presence", 38],
  ["Absence", 4]
];

export const options = {
  legend: "none",
  pieSliceText: "label",
  slices: {
    4: { offset: 0.2 },
    12: { offset: 0.3 },
    14: { offset: 0.4 },
    15: { offset: 0.5 },
  },
};

export default function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
