const LIMITS = {
  minLoanAmount: 500,
  maxLoanAmount: 5000,
  minDuration: 6,
  maxDuration: 24
};

const AMOUNTUNIT = {
  symbol: "$",
  placement: "prefix"
};

const DURATIONUNIT = {
  symbol: "months",
  placement: "suffix"
};

export { LIMITS, AMOUNTUNIT, DURATIONUNIT };
