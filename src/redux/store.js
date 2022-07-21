import { configureStore } from "@reduxjs/toolkit";
import productModelSlice from "./product-model/productModelSlice";
import cartItemsSlice from "./shopping-cart/cartItemsSlice";
import userActionSlice from "./userAction/userActionSlice";

export const store = configureStore({
  reducer: {
    productModel: productModelSlice,
    cartItems: cartItemsSlice,
    userAction: userActionSlice,
  },
});
