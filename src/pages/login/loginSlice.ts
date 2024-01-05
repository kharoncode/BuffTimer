import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginData } from './Login';

export type profile = {
   id: string;
   password?: string;
   email: string;
   name: string;
   intelligence: number;
   favoris: string;
   error?: string;
};

type loginState = {
   loading: boolean;
   profile: null | profile;
   error: null | string | undefined;
   auth: boolean;
};

export const fetchProfile = createAsyncThunk(
   'login/fetchProfile',
   async (log: loginData, { rejectWithValue }) => {
      //return fetch(`${import.meta.env.VITE_MOCKURL}profiles.json`, {
      return fetch(`${import.meta.env.VITE_API}/profiles`, {
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
               return {
                  id: filter[0].id,
                  email: filter[0].email,
                  name: filter[0].name,
                  intelligence: parseInt(filter[0].intelligence),
                  favoris: filter[0].favoris,
               };
            } else {
               return rejectWithValue({
                  error: 'Login Failed: Your user ID or password is incorrect',
               });
            }
         });
   }
);

export type newData = {
   id: string;
   email: string;
   name: string;
   intelligence: number;
   favoris: string;
};

export const uptadeProfile = createAsyncThunk(
   'login/uptadeProfile',
   async (newData: newData) => {
      const { id, email, name, intelligence, favoris } = newData;
      const body = {
         condition: { id: id },
         set: {
            email: email,
            name: name,
            intelligence: intelligence,
            favoris: favoris,
         },
      };
      //return fetch(`${import.meta.env.VITE_MOCKURL}profiles.json`, {
      return fetch(`${import.meta.env.VITE_API}/profiles`, {
         method: 'put',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body),
      })
         .then((result) => result.json())
         .then(() => {
            return {
               id: id,
               email: email,
               name: name,
               intelligence: intelligence,
               favoris: favoris,
            };
         });
   }
);

type newPassword = {
   id: string;
   password: string;
};

export const uptadeProfilePassword = createAsyncThunk(
   'login/uptadeProfilePassword',
   async (newPassword: newPassword) => {
      const { id, password } = newPassword;
      const body = {
         condition: { id: id },
         set: {
            password: password,
         },
      };
      //return fetch(`${import.meta.env.VITE_MOCKURL}profiles.json`, {
      return fetch(`${import.meta.env.VITE_API}/profiles`, {
         method: 'put',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body),
      });
   }
);

type favorisData = {
   id: string;
   list: string;
};

export const uptadeProfileFavoris = createAsyncThunk(
   'login/uptadeProfileFavoris',
   async (favorisData: favorisData) => {
      const { id, list } = favorisData;
      const body = {
         condition: { id: id },
         set: {
            favoris: list,
         },
      };
      //return fetch(`${import.meta.env.VITE_MOCKURL}profiles.json`, {
      return fetch(`${import.meta.env.VITE_API}/profiles`, {
         method: 'put',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body),
      })
         .then((result) => result.json())
         .then(() => {
            return list;
         });
   }
);

const initialState: loginState = {
   loading: false,
   profile: {
      id: '',
      name: '',
      email: '',
      intelligence: 0,
      favoris: '',
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
      });
      builder.addCase(uptadeProfile.pending, (state) => {
         console.log('pending');
         state.loading = true;
      });
      builder.addCase(uptadeProfile.fulfilled, (state, action) => {
         console.log('fulfilled');
         state.loading = false;
         state.profile = action.payload;
         state.error = null;
      });
      builder.addCase(uptadeProfile.rejected, (state, action) => {
         console.log('error');
         state.loading = false;
         state.profile = null;
         state.error = action.error.message;
      });
      builder.addCase(uptadeProfileFavoris.pending, (state) => {
         console.log('pending');
         state.loading = true;
      });
      builder.addCase(uptadeProfileFavoris.fulfilled, (state, action) => {
         console.log('fulfilled');
         state.loading = false;
         state.profile.favoris = action.payload;
         state.error = null;
      });
      builder.addCase(uptadeProfileFavoris.rejected, (state, action) => {
         console.log('error');
         state.loading = false;
         state.profile = null;
         state.error = action.error.message;
      });
   },
});
