import { configureStore } from "@reduxjs/toolkit";
import productsApi from './features/products/productsApi'; // Correct for default export
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Your cart slice reducer
    [productsApi.reducerPath]: productsApi.reducer, // Add productsApi.reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware), // Add RTK Query middleware
});

export default store;
