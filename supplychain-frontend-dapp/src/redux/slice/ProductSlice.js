import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  manufacturer: "",
  license: "",
  address: "",
  contact: "",
  manufactureDate: "",
  countryOfOrigin: "",
  expirationDate: "",
  trackingEnabled: false,
  batchTracking: false,
  subBatchAllowed: false,
  ownershipTransfer: false,
  escrowEnabled: false,
  supplyChainTracking: false,
  liveShipmentUpdates: false,
  buyerReviewEnabled: false,
  files: [],
  qrCodeData: "",
};

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        saveProduct: (state, action) => {
            state = action.payload;
        }
    }
})

export const { saveProduct } = ProductSlice.actions;
export default ProductSlice.reducer;