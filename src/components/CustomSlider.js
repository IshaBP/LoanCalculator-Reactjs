import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { PrettySliderStyle } from "../styles/CustomSliderStyles";
import { getLabel } from "../utils";

const PrettySlider = withStyles(PrettySliderStyle)(Slider);

const getMarks = (unit, min, max) => {
  return [
    {
      value: min,
      label: getLabel(unit, min)
    },
    {
      value: max,
      label: getLabel(unit, max)
    }
  ];
};

const CustomSlider = ({
  max,
  min,
  unit,
  label,
  value,
  onChange,
  ...otherProps
}) => {
  return (
    <div>
      <Typography variant="h4">{label}</Typography>
      <br />
      <br />
      <PrettySlider
        defaultValue={min}
        valueLabelDisplay="auto"
        valueLabelDisplay="on"
        marks={getMarks(unit, min, max)}
        min={min}
        max={max}
        onChangeCommitted={onChange}
        {...otherProps}
      />
    </div>
  );
};

CustomSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  unit: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(["prefix", "suffix"]).isRequired
  }),
  value: PropTypes.number,
  onChange: PropTypes.func
};

CustomSlider.defaultProps = {
  min: 0,
  max: 100,
  label: "Select Range",
  unit: {
    symbol: "",
    placement: "suffix"
  },
  value: 0,
  onChange: () => {}
};

export default CustomSlider;
