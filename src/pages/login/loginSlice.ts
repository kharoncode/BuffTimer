import { createSlice } from '@reduxjs/toolkit';

type LoginState = {
   id: string;
   password: string;
   name: string;
   intelligence: number;
   favoris: [string];
};

const initialState: LoginState = {
   id: '',
   password: '',
   name: '',
   intelligence: 0,
   favoris: [''],
};

export const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers: {},
});
