import React, { useCallback, useEffect, useRef, useState } from "react";

import Helmet from "../components/Helmet";
import productData from "../assets/fake-data/products";
import catagoryData from "../assets/fake-data/catagory";
import productColor from "../assets/fake-data/products-color";
import productSize from "../assets/fake-data/products-size";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
const Catalog = () => {
  const initFilter = {
    catagory: [],
    color: [],
    size: [],
  };
  const [filter, setFilter] = useState(initFilter);

  const productList = productData.getAllProducts();

  const [products, setProducts] = useState(productList);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATAGORY":
          setFilter({
            ...filter,
            catagory: [...filter.catagory, item.catagorySlug],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break;
        default:
          throw new Error("Not case in filterSelect");
      }
    } else {
      switch (type) {
        case "CATAGORY":
          const newCatogory = filter.catagory.filter(
            (e) => e !== item.catagorySlug
          );
          setFilter({ ...filter, catagory: newCatogory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
          throw new Error("Not case in filterSelect");
      }
    }
  };

  const updateProduct = useCallback(() => {
    let temp = productList;

    if (filter.catagory.length > 0) {
      temp = temp.filter((e) => filter.catagory.includes(e.categorySlug));
    }
    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }
    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }
    setProducts(temp);
  }, [filter, productList]);

  const clearFilter = () => {
    setFilter(initFilter);
  };
  useEffect(() => {
    updateProduct();
  }, [updateProduct]);

  const filterRef = useRef(null);

  const handleToggleFilter = () => filterRef.current.classList.toggle("active");

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__filter__close" onClick={handleToggleFilter}>
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          {/* widget filter product type */}
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {catagoryData.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("CATAGORY", input.checked, item)
                    }
                    checked={filter.catagory.includes(item.catagorySlug)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* end widget filter product type */}

          {/* widget filter product color */}
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Màu sắc</div>
            <div className="catalog__filter__widget__content">
              {productColor.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("COLOR", input.checked, item)
                    }
                    checked={filter.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/*end widget filter product color */}

          {/* widget filter product size */}
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Kích thước</div>
            <div className="catalog__filter__widget__content">
              {productSize.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("SIZE", input.checked, item)
                    }
                    checked={filter.size.includes(item.size)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/*end widget filter product size */}

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size={"sm"} onClick={clearFilter}>
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button onClick={handleToggleFilter} size={"sm"}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          <InfinityList products={products} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
