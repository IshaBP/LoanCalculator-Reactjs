/**
 * Min - Max limits for Values.
 */
const LIMITS = {
  minLoanAmount: 500,
  maxLoanAmount: 5000,
  minDuration: 6,
  maxDuration: 24
};

/**
 * Amount unit.
 */
const AMOUNTUNIT = {
  symbol: "$",
  placement: "prefix"
};

/**
 * Duration unit.
 */
const DURATIONUNIT = {
  symbol: "months",
  placement: "suffix"
};

export { LIMITS, AMOUNTUNIT, DURATIONUNIT };
