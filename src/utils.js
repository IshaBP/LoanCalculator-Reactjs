export const getLabel = (unit, value) => {
  return unit && unit.placement
    ? unit.placement === "prefix"
      ? `${unit.symbol}${value}`
      : `${value}${unit.symbol}`
    : `${value}`;
};
