import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlice";
import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

const ProductView = ({ product }) => {
  const dispatch = useDispatch();

  if (product === undefined) {
    product = {
      price: 0,
      title: "",
      colors: [],
      size: [],
    };
  }

  const [previewImg, setPreviewImg] = useState();

  const [extend, setExtend] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const handleToggleExtend = () => {
    setExtend(!extend);
  };
  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1));
    }
  };
  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu!!!");
      return false;
    }
    if (size === undefined) {
      alert("Vui lòng chọn khích thước!!!");
      return false;
    }
    return true;
  };

  const addToCart = () => {
    if (check()) {
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      alert("Success!");
    }
  };
  const navigate = useNavigate();
  const pay = () => {
    if (check()) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    setColor();
    setSize();
    setQuantity(1);
  }, [product]);

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div className="product-description">
          <div className="product-description__title">chi tiết sản phẩm</div>
          <div
            className={`product-description__content ${extend ? "extend" : ""}`}
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button size={"sm"} onClick={handleToggleExtend}>
              {extend ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <div className="product__info__title">
          <h3>{product.title}</h3>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__price">
            {numberWithCommas(product.price)}
          </div>
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => {
                  setColor(item);
                }}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích thước</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => {
                  setSize(item);
                }}
              >
                <div className="product__info__item__list__item__size">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              <span>{quantity}</span>
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__buttonArea">
            <Button size={"sm"} onClick={() => addToCart()}>
              Thêm vào giỏ
            </Button>
            <Button
              size={"sm"}
              onClick={() => {
                pay();
              }}
            >
              Mua hàng
            </Button>
          </div>
        </div>
        <div className="product-description mobile">
          <div className="product-description__title">chi tiết sản phẩm</div>
          <div
            className={`product-description__content ${extend ? "extend" : ""}`}
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button size={"sm"} onClick={handleToggleExtend}>
              {extend ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
