import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltipWrapper = ({ children }) => (
  <div className="rounded-sm border border-[#ADBDEF] bg-[#F6F8FD] p-2 text-sm">
    {children}
  </div>
);

export const CustomLineChart = ({
  data,
  xKey = "name",
  yKey = "amount",
  tooltipRenderer,
  showLegend = true,
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
      >
        <XAxis
        
          dataKey={xKey}
          tick={{ fontSize: 9 }}
          tickFormatter={(value) =>
            typeof value === "string"
              ? value.slice(0, 3)
              : String(value).slice(0, 3)
          }
        />
        <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
        <Tooltip
          content={({ payload, active }) => {
            if (!active || !payload?.length) return null;

            const data = payload[0];

            return (
              <CustomTooltipWrapper>
                {tooltipRenderer ? (
                  tooltipRenderer(data)
                ) : (
                  <>
                    <p>
                      <strong>{data?.payload?.[xKey]}</strong>
                    </p>
                    <p>
                      {yKey}: {data?.payload?.[yKey]?.toLocaleString?.()}
                    </p>
                  </>
                )}
              </CustomTooltipWrapper>
            );
          }}
        />
        {showLegend && <Legend />}
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="none"
          activeDot={{ r: 8 }}
          dot={{ stroke: "#375ED9", fill: "#375ED9" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
