import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginData } from './Login';

export type profile = {
   id: string;
   password: string;
   name: string;
   intelligence: number;
   favoris: [string];
};

type loginState = {
   loading: boolean;
   profile: null | profile;
   error: null | string;
   auth: boolean;
};

export const fetchProfile = createAsyncThunk(
   'login/fetchProfile',
   async (log: loginData, { rejectWithValue }) => {
      return fetch(`${import.meta.env.VITE_MOCKURL}`, {
         //return fetch(`${import.meta.env.VITE_API}/profiles`, {
         method: 'get',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((result) => result.json())
         .then((data) =>
            data.map((el: profile) => {
               if (el.id !== log.login) {
                  return rejectWithValue({ error: 'Wrong Log' });
               } else {
                  if (el.password !== log.password) {
                     return rejectWithValue({ error: 'Wrong Pass' });
                  } else {
                     return el;
                  }
               }
            })
         );
   }
);

const initialState: loginState = {
   loading: false,
   profile: {
      id: '',
      password: '',
      name: '',
      intelligence: 0,
      favoris: [''],
   },
   error: null,
   auth: false,
};

export const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers: {
      resetLogin: () => {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProfile.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchProfile.fulfilled, (state, action) => {
         if (action.payload[0].payload?.error) {
            state.loading = false;
            state.profile = null;
            state.error = action.payload[0].payload.error;
            state.auth = false;
         } else {
            state.loading = false;
            state.profile = action.payload[0];
            state.error = null;
            state.auth = true;
         }
      });
      builder.addCase(fetchProfile.rejected, (state, action) => {
         console.log('error');
         console.log(action.error);
         state.loading = false;
         state.profile = null;
         state.error = action.error.toString();
      });
   },
});
