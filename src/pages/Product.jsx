import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import productData from "../assets/fake-data/products";
import Grid from "../components/Grid";
import Helmet from "../components/Helmet";
import ProductCart from "../components/ProductCart";
import ProductView from "../components/ProductView";
import Section, { SectionBody, SectionTitle } from "../components/Section";

const Product = (props) => {
  const param = useParams();

  const product = productData.getProductbySlug(param.slug);

  const relatedProducts = productData.getProducts(8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
              <ProductCart key={index} {...item} price={Number(item.price)} />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
