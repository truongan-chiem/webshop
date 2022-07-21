import React from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import dataHeroSlider from "../assets/fake-data/heroslider";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import PolicyCart from "../components/PolicyCart";
import policyData from "../assets/fake-data/policy";
import Grid from "../components/Grid";
import productData from "../assets/fake-data/products";
import ProductCart from "../components/ProductCart";
import banner from "../assets/images/banner.png";

const Home = () => {
  return (
    <Helmet title="Trang chủ">
      {/* Hero slide */}
      <HeroSlider data={dataHeroSlider} control auto />
      {/* End hero slide */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={10}>
            {policyData.map((item, index) => (
              <Link to={"/policy"} key={index}>
                <PolicyCart
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/*end policy section */}

      {/* best seller section */}
      <Section>
        <SectionTitle>Sản phẩm bán chạy nhất</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(4).map((item, index) => (
              <ProductCart
                key={index}
                title={item.title}
                price={Number(item.price)}
                image01={item.image01}
                image02={item.image02}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best seller section */}

      {/* new  product section*/}
      <Section>
        <SectionTitle>Sản phẩm mới nhất</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(8).map((item, index) => (
              <ProductCart
                key={index}
                title={item.title}
                price={Number(item.price)}
                image01={item.image01}
                image02={item.image02}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end new  product section*/}

      {/* banner section */}
      <Section>
        <SectionBody>
          <img src={banner} alt="" />
        </SectionBody>
      </Section>
      {/*end banner section*/}

      {/* popular product section */}
      <Section>
        <SectionTitle>Phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(12).map((item, index) => (
              <ProductCart
                key={index}
                title={item.title}
                price={Number(item.price)}
                image01={item.image01}
                image02={item.image02}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/*end popular product section */}
    </Helmet>
  );
};

export default Home;
