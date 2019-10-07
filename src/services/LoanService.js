import axios from "axios";
import URLS from "../constants/URLConstants";

export const getPaymentDetails = (amount, duration) => {
  return axios.get(
    `${URLS.paymentDetails}amount=${amount}&numMonths=${duration}`
  );
};
