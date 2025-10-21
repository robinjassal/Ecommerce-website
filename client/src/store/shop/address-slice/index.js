import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/addNewAddress",
  async (formData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/shop/address/add`,
      formData
    );
    return res.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/address/fetchAllAddresses",
  async (userId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/shop/address/get/${userId}`
    );
    return res.data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({ userId, addressId, formData }) => {
    const res = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return res.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const res = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/shop/address/delete/${userId}/${addressId}`
    );
    return res.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = true;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = true;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
