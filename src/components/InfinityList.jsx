import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import ProductCart from "./ProductCart";

const InfinityList = ({ products }) => {
  const perLoad = 6;

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(products.slice(0, perLoad));
    setIndex(1);
  }, [products]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(products.length / perLoad);
      const maxIndex = products.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(products.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, products, data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={10}>
        {data.map((item, index) => (
          <ProductCart key={index} {...item} price={Number(item.price)} />
        ))}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default InfinityList;
