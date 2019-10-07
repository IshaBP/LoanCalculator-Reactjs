/**
 * Get appropriately structured value with its unit.
 * @param {Object} unit - The structure of unit for values.
 * @param {number} value - The value of entity.
 * @returns {string} - Value with its unit.
 */
export const getLabel = (unit, value) => {
  return unit && unit.placement
    ? unit.placement === "prefix"
      ? `${unit.symbol}${value}`
      : `${value}${unit.symbol}`
    : `${value}`;
};
