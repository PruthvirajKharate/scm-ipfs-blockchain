import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scannedProduct: "",
};

const QrData = createSlice({
  name: "qrData",
  initialState,
  reducers: {
    // Corrected from "reducer" to "reducers"
    setData: (state, action) => {
      state.scannedProduct = action.payload; // Corrected state update
    },
  },
});

export const { setData } = QrData.actions; // Correct export
export default QrData.reducer;
