import axios from "axios";
import URLS from "../constants/URLConstants";

/**
 * Get loan repayment details API call
 * @param {number} amount - The loan amount.
 * @param {number} duration - The loan duration.
 * @returns {Promise} - Promise of API call
 */
export const getPaymentDetails = (amount, duration) => {
  return axios.get(
    `${URLS.paymentDetails}amount=${amount}&numMonths=${duration}`
  );
};
