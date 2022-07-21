import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Router from "../routes/Router";
import ProductViewModel from "./ProductViewModel";
const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <div className="main">
          <Router />
        </div>
      </div>
      <Footer />
      <ProductViewModel />
    </BrowserRouter>
  );
};

export default Layout;
