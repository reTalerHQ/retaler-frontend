export const formatCurrency = (
  value,
  decimalPlaces = 2,
  includeDecimals = true,
) => {
  if (typeof value !== "number") {
    value = parseFloat(value);
    if (isNaN(value)) return "Invalid number";
  }

  const options = {
    minimumFractionDigits: includeDecimals ? decimalPlaces : 0,
    maximumFractionDigits: includeDecimals ? decimalPlaces : 0,
  };

  return value.toLocaleString("en-NG", options);
};
