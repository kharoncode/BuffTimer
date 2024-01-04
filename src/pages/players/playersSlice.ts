import { formatPlayers } from '@/utils/formatPlayer';
import type { data, players } from '@/utils/formatPlayer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type playersState = {
   loading: boolean;
   players: players;
   error: null | string | undefined;
};

export const fetchPlayers = createAsyncThunk(
   'players/fetchPlayers',
   async () => {
      return fetch(`${import.meta.env.VITE_MOCKURL}players.json`, {
         //return fetch(`${import.meta.env.VITE_API}/players`, {
         method: 'get',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((result) => result.json())
         .then((data: data) => {
            return formatPlayers(data);
         });
   }
);

type newLife = {
   id: string;
   life: {
      currentLife: number;
      maxLife: number;
   };
};

export const uptadePlayersLife = createAsyncThunk(
   'players/uptadePlayersLife',
   async (newLife: newLife) => {
      const { id, life } = newLife;
      const body = {
         condition: { id: id },
         set: {
            currentLife: life.currentLife,
            maxLife: life.maxLife,
         },
      };
      //return fetch(`${import.meta.env.VITE_MOCKURL}profiles.json`, {
      return fetch(`${import.meta.env.VITE_API}/players`, {
         method: 'put',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body),
      })
         .then((result) => result.json())
         .then((data) => {
            console.log(data);
            return {
               id: id,
               life: {
                  currentLife: life.currentLife,
                  maxLife: life.maxLife,
               },
            };
         });
   }
);

const initialState: playersState = {
   loading: false,
   players: {},
   error: null,
};

type action = {
   payload: newLife;
   type: string;
};

export const playersSlice = createSlice({
   name: 'players',
   initialState,
   reducers: {
      updateLife: (state, action: action) => {
         const { id, life } = action.payload;
         const player = { ...state.players[id], life: life };
         const players = { ...state.players };
         players[id] = player;
         return { ...state, players: players };
      },
      resetPlayers: () => {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPlayers.pending, (state) => {
         console.log('pending');
         state.loading = true;
      });
      builder.addCase(fetchPlayers.fulfilled, (state, action) => {
         console.log('fulfilled');
         state.loading = false;
         state.players = action.payload;
         state.error = null;
      });
      builder.addCase(fetchPlayers.rejected, (state, action) => {
         console.log('error');
         state.loading = false;
         state.players = {};
         state.error = action.error.message;
      });
   },
});
