import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

const HeroSlider = (props) => {
  const [activeSLide, setActiveSLide] = useState(0);
  const { data, control, auto, timeOut = 3000 } = props;

  const nextSlide = useCallback(() => {
    const index = activeSLide + 1 === data.length ? 0 : activeSLide + 1;
    setActiveSLide(index);
  }, [activeSLide, data]);

  const prevSlide = () => {
    const index = activeSLide - 1 < 0 ? data.length - 1 : activeSLide - 1;
    setActiveSLide(index);
  };

  useEffect(() => {
    if (auto) {
      const autoNext = setInterval(() => {
        nextSlide();
      }, timeOut);
      return () => {
        clearInterval(autoNext);
      };
    }
  }, [nextSlide, timeOut, auto]);

  return (
    <div className="hero-slider">
      {data.map((item, index) => (
        <HeroSliderItem
          key={index}
          item={item}
          active={index === activeSLide}
        />
      ))}
      {control ? (
        <div className="hero-slider__control">
          <div className="hero-slider__control__item" onClick={prevSlide}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="hero-slider__control__item">
            <div className="index">
              {activeSLide + 1}/{data.length}
            </div>
          </div>
          <div className="hero-slider__control__item" onClick={nextSlide}>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const HeroSliderItem = ({ item, active }) => {
  return (
    <div className={`hero-slider__item ${active ? "active" : ""}`}>
      <div className="hero-slider__item__info">
        <div className={`hero-slider__item__info__title color-${item.color}`}>
          <span>{item.title}</span>
        </div>
        <div className="hero-slider__item__info__description">
          <span>{item.description}</span>
        </div>
        <div className="hero-slider__item__info__btn">
          <Link to={item.path}>
            <Button
              backgroundColor={`bg-${item.color}`}
              animate
              icon={"bx bx-cart"}
              size="sm"
            >
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </div>
      <div className="hero-slider__item__image">
        <div className={`shape bg-${item.color}`}></div>
        <img src={item.img} alt="img" />
      </div>
    </div>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};

export default HeroSlider;
