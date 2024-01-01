import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginData } from './Login';
import type { players } from '@/utils/formatPlayer';

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
   error: null | string | undefined;
   auth: boolean;
   favoris: players;
};

type action = {
   payload: players;
   type: string;
};

export const fetchProfile = createAsyncThunk(
   'login/fetchProfile',
   async (log: loginData, { rejectWithValue }) => {
      return fetch(`${import.meta.env.VITE_MOCKURL}profiles.json`, {
         //return fetch(`${import.meta.env.VITE_API}/profiles`, {
         method: 'get',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((result) => result.json())
         .then((data) => {
            const filter = data.filter(function (el: profile) {
               return el.id === log.login && el.password === log.password;
            });
            if (filter.length !== 0) {
               return filter[0];
            } else {
               return rejectWithValue({
                  error: 'Login Failed: Your user ID or password is incorrect',
               });
            }
         });
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
   favoris: {},
};

export const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers: {
      addFavoris: (state, action: action) => {
         const favoris = action.payload;
         return { ...state, favoris: favoris };
      },
      resetLogin: () => {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProfile.pending, (state) => {
         console.log('pending');
         state.loading = true;
      });
      builder.addCase(fetchProfile.fulfilled, (state, action) => {
         console.log('fulfilled');
         state.loading = false;
         state.profile = action.payload;
         state.error = null;
         state.auth = true;
      });
      builder.addCase(fetchProfile.rejected, (state, action) => {
         console.log('error');
         state.loading = false;
         state.profile = null;
         state.error = action.error.message;
         state.auth = false;
      });
   },
});
