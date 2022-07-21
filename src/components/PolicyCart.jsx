import React from "react";
import PropTypes from "prop-types";

const PolicyCart = ({ name, description, icon }) => {
  return (
    <div className="policy-cart">
      <div className="policy-cart__icon">
        <i className={icon}></i>
      </div>
      <div className="policy-cart__info">
        <div className="policy-cart__info__name">{name}</div>
        <div className="policy-cart__info__description">{description}</div>
      </div>
    </div>
  );
};

PolicyCart.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default PolicyCart;
