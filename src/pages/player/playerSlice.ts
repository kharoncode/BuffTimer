import { createSlice } from '@reduxjs/toolkit';

type playerState = {
   id: null;
};

const initialState: playerState = {
   id: null,
};

export const playerSlice = createSlice({
   name: 'player',
   initialState,
   reducers: {
      removeId: () => {
         return initialState;
      },
      addId: (state, action) => {
         return { ...state, id: action.payload };
      },
   },
});
