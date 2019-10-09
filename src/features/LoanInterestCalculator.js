import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import CustomSlider from "../components/CustomSlider";
import { AMOUNTUNIT, DURATIONUNIT, LIMITS } from "../constants/constants";
import { CalculatorStyle } from "../styles/CalculatorStyles";
import { getPaymentDetails } from "../services/LoanService";
import { getLabel } from "../utils";

const LoanInterestCalculator = () => {
  const classes = CalculatorStyle();

  /**
   * State variables.
   */
  const [amount, setAmount] = useState(LIMITS.minLoanAmount);
  const [duration, setDuration] = useState(LIMITS.minDuration);
  const [interestRate, setInterestRate] = useState();
  const [monthlyPayment, setMonthlyPayment] = useState();
  const [chipData, setChipData] = React.useState([]);

  /**
   * Amount change event handler.
   * @param {Object} event - The slider change event.
   * @param {number} amountValue - The slider change value.
   */
  const onAmountChange = (event, amountValue) => {
    setAmount(amountValue);
  };
  /**
   * Duration change event handler.
   * @param {Object} event - The slider change event.
   * @param {number} durationValue - The slider change value.
   */
  const onDurationChange = (event, durationValue) => {
    setDuration(durationValue);
  };
  /**
   * Previous data peek.
   * @param {Object} data - The object containing previous data configuration.
   */
  const handleClickPrevData = data => () => {
    console.log(data);
    setAmount(data.key.amount);
    setDuration(data.key.duration);
    setInterestRate(data.key.interestRate);
    setMonthlyPayment(data.key.monthlyPayment);
  };
  /**
   * Update Local Storage and Chips.
   * @param {Object} config - The new config object.
   */
  const updateLocalStorageAndChips = config => {
    let configHistory = [];
    configHistory = JSON.parse(localStorage.getItem("configHistory") || "[]");
    /*     if (
      configHistory.some(
        configObject =>
          configObject.amount === config.amount &&
          configObject.duration === config.duration
      )
    ) {
      deleteConfig()
    } */
    configHistory = configHistory.filter(function(configObject) {
      return (
        configObject.amount !== config.amount ||
        configObject.duration !== config.duration
      );
    });
    configHistory.unshift(config);
    localStorage.setItem("configHistory", JSON.stringify(configHistory));

    let newChipData = [];
    configHistory.forEach((configObject, index) => {
      newChipData.push({
        key: configObject,
        label: `${getLabel(AMOUNTUNIT, configObject.amount)} - ${getLabel(
          DURATIONUNIT,
          configObject.duration
        )}`
      });
    });

    setChipData(newChipData);
  };
  /**
   * On amount or duration change:
   * 1) Fetch interest rate, monthly payment
   * 2) Update local storage & chips
   */
  useEffect(() => {
    getPaymentDetails(amount, duration).then(res => {
      setInterestRate(res.data.interestRate);
      setMonthlyPayment(res.data.monthlyPayment.amount);

      let newConfig = {
        amount: amount,
        duration: duration,
        interestRate: res.data.interestRate,
        monthlyPayment: res.data.monthlyPayment.amount
      };
      updateLocalStorageAndChips(newConfig);
    });
  }, [amount, duration]);

  /**
   * Loan Interest Calculator Component.
   */
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
      // style={styles.paperContainer}
    >
      <Paper className={classes.root} elevation={10}>
        <div className={classes.margin} />
        <CustomSlider
          min={LIMITS.minLoanAmount}
          max={LIMITS.maxLoanAmount}
          unit={AMOUNTUNIT}
          value={amount}
          label="Loan Amount"
          onChange={onAmountChange}
        />
        <div className={classes.margin} />
        <CustomSlider
          min={LIMITS.minDuration}
          max={LIMITS.maxDuration}
          unit={DURATIONUNIT}
          value={duration}
          label="Loan Duration"
          onChange={onDurationChange}
        />
        <Typography variant="h4">{interestRate}</Typography>
        <Typography variant="h4">{monthlyPayment}</Typography>
        <Divider />
        {chipData &&
          chipData.map(data => (
            <Chip
              key={data.key}
              label={data.label}
              clickable
              onClick={handleClickPrevData(data)}
            />
          ))}
      </Paper>
    </Grid>
  );
};

export default LoanInterestCalculator;
