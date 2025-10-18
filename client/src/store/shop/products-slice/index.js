import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  isLoading: true,
};

export const fetchAllFilterProducts = createAsyncThunk(
  "/products/fetchAllFilterProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/shop/products/get`
    );
    return response?.data;
  }
);

const ShopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default ShopProductsSlice.reducer;
