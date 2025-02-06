import { configureStore } from "@reduxjs/toolkit";
import productsApi from "./features/products/productsApi"; // API slice
import orderApi from "./features/orders/orderApi"; // API slice
import cartReducer from "./features/cart/cartSlice"; // Cart slice

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Your cart slice reducer
    [productsApi.reducerPath]: productsApi.reducer, // Add productsApi reducer
    [orderApi.reducerPath]: orderApi.reducer, // Add orderApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, orderApi.middleware), // Combine middleware
});

export default store;
