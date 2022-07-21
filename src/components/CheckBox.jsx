import React, { useRef } from "react";
import PropTypes from "prop-types";

const CheckBox = ({ label, checked, onChange }) => {
  const inputRef = useRef(null);
  const handleChange = () => {
    if (onChange) {
      onChange(inputRef.current);
    }
  };
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        onChange={handleChange}
        checked={checked}
      />
      <span className="custom-checkbox__checkmark">
        <i className="bx bx-check"></i>
      </span>
      {label}
    </label>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default CheckBox;
