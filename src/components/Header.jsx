import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../assets/images/Logo-2.png";
const directContact = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};
const mainNavs = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Liên hệ",
    path: "",
    onClick: directContact,
  },
];

const Header = () => {
  const { pathname } = useLocation();

  const cartItems = useSelector((state) => state.cartItems.value);

  const activeNav = mainNavs.findIndex((e) => e.path === pathname);

  const headerRef = useRef();

  const [activeMenuLeft, setActiveMenuLeft] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const menuRef = useRef(null);
  const menuToggle = () => {
    menuRef.current.classList.toggle("active");
    setActiveMenuLeft(!activeMenuLeft);
  };

  useEffect(() => {
    if (activeMenuLeft) {
      headerRef.current.classList.add("slide-menu");
    } else {
      headerRef.current.classList.remove("slide-menu");
    }
  }, [activeMenuLeft]);
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="LogoImage" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuRef}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNavs.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item 
                ${index === activeNav ? "active" : ""}`}
                onClick={menuToggle}
              >
                <Link to={item.path} onClick={() => item.onClick()}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag header__menu__right__item__shopBag">
                  <span>{cartItems.length}</span>
                </i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/profile/">
                <i className="bx bx-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
