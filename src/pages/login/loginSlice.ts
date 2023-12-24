import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginData } from './Login';

export type profile = {
   id: string;
   password: string;
   name: string;
   intelligence: number;
   favoris: [string];
};

type LoginState = {
   loading: boolean;
   profile: null | profile;
   error: null | string;
};

export const fetchProfile = createAsyncThunk(
   'login/fetchProfile',
   async (log: loginData, { rejectWithValue }) => {
      return fetch(`${import.meta.env.VITE_APIURL}/profiles`, {
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

const initialState: LoginState = {
   loading: false,
   profile: {
      id: '',
      password: '',
      name: '',
      intelligence: 0,
      favoris: [''],
   },
   error: null,
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
         state.profile = null;
         state.error = null;
      });
      builder.addCase(fetchProfile.fulfilled, (state, action) => {
         if (action.payload[0].payload?.error) {
            state.loading = false;
            state.profile = null;
            state.error = action.payload[0].payload.error;
         } else {
            state.loading = false;
            state.profile = action.payload[0];
            state.error = null;
         }
      });
      builder.addCase(fetchProfile.rejected, (state, action) => {
         console.log('error');
         state.loading = false;
         state.profile = null;
         state.error = action.error.toString();
      });
   },
});
