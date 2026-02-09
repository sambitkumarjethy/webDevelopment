import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
