import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const defaultFn = () => {
    console.log("default Function!!!");
  };
  const {
    backgroundColor = "bg-main",
    size = "",
    animate,
    children,
    icon,
    onClick = defaultFn,
  } = props;

  const _animate = animate ? "btn-animate" : "";

  return (
    <button
      className={`btn ${backgroundColor} btn-${size} ${_animate}`}
      onClick={onClick}
    >
      <span className="btn__txt">{children}</span>
      {icon ? (
        <span className="btn__icon">
          <i className={`${icon} bx-tada `}></i>
        </span>
      ) : null}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  animate: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
