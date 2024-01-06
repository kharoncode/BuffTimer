import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
   return fetch(`${import.meta.env.VITE_DATAURL}`, {
      method: 'get',
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then((result) => result.json())
      .then((data) => {
         return data;
      });
});

type dataState = {
   loading: boolean;
   data: { [key: string]: [key: string] };
   error: null | string | undefined;
};

const initialState: dataState = {
   loading: false,
   data: {},
   error: null,
};

export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
      resetLogin: () => {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchData.pending, (state) => {
         console.log('pending');
         state.loading = true;
      });
      builder.addCase(fetchData.fulfilled, (state, action) => {
         console.log('fulfilled');
         state.loading = false;
         state.data = action.payload;
         state.error = null;
      });
      builder.addCase(fetchData.rejected, (state, action) => {
         console.log('error');
         state.loading = false;
         state.error = action.error.message;
      });
   },
});
