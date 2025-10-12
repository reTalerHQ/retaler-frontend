import { formatCurrency } from "@/utils/number-utilites";
import React from "react";

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="intro">{`Amount : ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};
