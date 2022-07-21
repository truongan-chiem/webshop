import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { set } from "../redux/product-model/productModelSlice";
import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

const ProductCart = ({ title, price, image01, image02, slug }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-cart">
      <Link to={`/catalog/${slug}`}>
        <div className="product-cart__image">
          <img src={image01} alt="" />
          <img src={image02} alt="" />
        </div>
        <h3 className="product-cart__title">{title}</h3>
        <div className="product-cart__price">
          {numberWithCommas(price)}
          <span className="product-cart__price__old">
            <del>{numberWithCommas(399000)}</del>
          </span>
        </div>
      </Link>
      <div className="product-cart__button">
        <Button
          animate
          size={"sm"}
          icon={"bx bx-cart"}
          onClick={() => dispatch(set(slug))}
        >
          chọn mua
        </Button>
      </div>
    </div>
  );
};

ProductCart.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image01: PropTypes.string.isRequired,
  image02: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCart;
