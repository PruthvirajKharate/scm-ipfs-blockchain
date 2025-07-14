import { configureStore } from "@reduxjs/toolkit";
import WalletSlice from "./slice/WalletSlice";
import QrData from "./slice/QrData";
import Product from "./slice/ProductSlice"

export const store = configureStore({
  reducer: {
    wallet: WalletSlice,
    qrData: QrData,
    product: Product,
  },
});

export default store;
