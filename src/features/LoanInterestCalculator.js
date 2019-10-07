import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import CustomSlider from "../components/CustomSlider";
import { AMOUNTUNIT, DURATIONUNIT, LIMITS } from "../constants/constants";
import Grid from "@material-ui/core/Grid";
import { CalculatorStyle } from "../styles/CalculatorStyles";
import { getPaymentDetails } from "../services/LoanService";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import { getLabel } from "../utils";

const styles = {
  paperContainer: {
    backgroundColor: "#28304C"
  }
};

const LoanInterestCalculator = props => {
  const classes = CalculatorStyle();

  const [amount, setAmount] = useState(LIMITS.minLoanAmount);
  const [duration, setDuration] = useState(LIMITS.minDuration);
  const [interestRate, setInterestRate] = useState();
  const [monthlyPayment, setMonthlyPayment] = useState();
  const [chipData, setChipData] = React.useState([]);

  const onAmountChange = (event, amountValue) => {
    setAmount(amountValue);
  };

  const onDurationChange = (event, durationValue) => {
    setDuration(durationValue);
  };

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

      let configHistory = [];
      configHistory = JSON.parse(localStorage.getItem("configHistory") || "[]");
      console.log(configHistory, newConfig);
      configHistory.unshift(newConfig);
      localStorage.setItem("configHistory", JSON.stringify(configHistory));

      let newChipData = [];
      configHistory.forEach(configObject => {
        newChipData.push({
          key: configObject,
          label: `${getLabel(AMOUNTUNIT, configObject.amount)} - ${getLabel(
            DURATIONUNIT,
            configObject.duration
          )}`
        });
      });

      console.log(newChipData);
      setChipData(chipData.push(newChipData));
    });
  }, [amount, duration]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
      style={styles.paperContainer}
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
          chipData.map(data => {
            return <Chip key={data.key} label={data.label} />;
          })}
        {localStorage.getItem("configHistory")}
      </Paper>
    </Grid>
  );
};

LoanInterestCalculator.propTypes = {};

export default LoanInterestCalculator;
