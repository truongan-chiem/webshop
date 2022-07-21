import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { remove } from "../redux/product-model/productModelSlice";
import ProductView from "./ProductView";
import ProductData from "../assets/fake-data/products";
import Button from "./Button";
const ProductViewModel = () => {
  const productSlug = useSelector((state) => state.productModel.value);

  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);
  //   const product = ProductData.getProductbySlug("ao-thun-dinosaur-14");

  useEffect(() => {
    setProduct(ProductData.getProductbySlug(productSlug));
  }, [productSlug]);

  return (
    <div
      className={`product-view__model ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__model__content">
        <ProductView product={product} />
        <div className="product-view__model__content__close">
          <Button
            size={"sm"}
            onClick={() => {
              dispatch(remove());
            }}
          >
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModel;
