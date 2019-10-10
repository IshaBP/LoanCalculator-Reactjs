/**
 * Min - Max limits for Values.
 * @constant
 */
const LIMITS = {
  minLoanAmount: 500,
  maxLoanAmount: 5000,
  minDuration: 6,
  maxDuration: 24
};

/**
 * Amount unit.
 * @constant
 */
const AMOUNTUNIT = {
  symbol: "$",
  placement: "prefix"
};

/**
 * Duration unit.
 * @constant
 */
const DURATIONUNIT = {
  symbol: "months",
  placement: "suffix"
};

export { LIMITS, AMOUNTUNIT, DURATIONUNIT };
