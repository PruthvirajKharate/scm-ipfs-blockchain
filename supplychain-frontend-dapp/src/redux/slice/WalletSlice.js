import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provider: null,
  signer: null,
  account: null,
};

const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setProvider, setSigner, setAccount } = WalletSlice.actions;
export default WalletSlice.reducer;
