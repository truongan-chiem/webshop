import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Helmet from "../components/Helmet";
import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);

  const [cardProducts, setCardProducts] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCardProducts(productData.getCartItemsDetail(cartItems));
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
    setTotalPrice(
      cartItems.reduce(
        (totalPrice, item) =>
          totalPrice + Number(item.quantity) * Number(item.price),
        0
      )
    );
  }, [cartItems]);

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} trong giỏ hàng.</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền</span>
              <span>{numberWithCommas(totalPrice)} đ</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size={"block"}>Đặt hàng</Button>
            <Link to={"/catalog"}>
              <Button size={"block"}>Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cardProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
