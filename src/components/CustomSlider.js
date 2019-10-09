import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { PrettySliderStyle } from "../styles/CustomSliderStyles";
import { getLabel } from "../utils";

/**
 * Slider with customized style.
 */
const PrettySlider = withStyles(PrettySliderStyle)(Slider);

/**
 * Get marked values on the Slider - min & max.
 * @param {Object} unit - The structure of unit for values.
 * @param {number} max - The upper limit of allowed values.
 * @param {number} min - The lower limit of allowed values.
 * @returns {Array} - Array of marked values on the Slider.
 */
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

/**
 * CustomSlider Component - Label & Slider.
 */
const CustomSlider = ({
  max,
  min,
  unit,
  label,
  value,
  onChange,
  ...otherProps
}) => {
  const [sliderValue, setSliderValue] = useState(value);
  
  return (
    <div>
      <Typography variant="h4">{label}</Typography>
      <br />
      <br />
      <PrettySlider
        defaultValue={min}
        valueLabelDisplay="on"
        marks={getMarks(unit, min, max)}
        min={min}
        max={max}
        value={value}
        onChangeCommitted={onChange}
        {...otherProps}
      />
    </div>
  );
};

/**
 * CustomSlider - PropTypes
 */
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

/**
 * CustomSlider - Default Props
 */
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
