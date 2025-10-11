import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const CustomBarChart = ({
  data,
  xKey,
  yKey,
  showLegend = true,
  tooltipRenderer,
}) => {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip content={tooltipRenderer} />
          {showLegend && <Legend />}
          <Bar dataKey={yKey} fill="#375ed9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
