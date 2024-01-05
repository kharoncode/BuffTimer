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
      //return fetch(`${import.meta.env.VITE_MOCKURL}players.json`, {
      return fetch(`${import.meta.env.VITE_API}/players`, {
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
         .then(() => {
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

type newSpell = {
   index: number;
   id: string;
   spell: string;
   date: number;
};

type setAdd = { [key: string]: number };

export const uptadePlayersBuff = createAsyncThunk(
   'players/uptadePlayersBuff',
   async (newSpell: newSpell) => {
      const { id, spell, date } = newSpell;
      const set: setAdd = {};
      set[spell] = date;
      const body = {
         condition: { id: id },
         set: set,
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
         .then(() => {
            return newSpell;
         });
   }
);

type spellId = {
   index: number;
   id: string;
   spell: string;
};

type setDelete = { [key: string]: null };

export const deletePlayerBuff = createAsyncThunk(
   'players/deletePlayerBuff',
   async (removeSpell: spellId) => {
      const { id, spell } = removeSpell;
      const set: setDelete = {};
      set[spell] = null;
      const body = {
         condition: { id: id },
         set: set,
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
         .then(() => {
            return removeSpell;
         });
   }
);

const initialState: playersState = {
   loading: false,
   players: {},
   error: null,
};

export const playersSlice = createSlice({
   name: 'players',
   initialState,
   reducers: {
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
      builder.addCase(uptadePlayersLife.pending, () => {
         console.log('pending');
      });
      builder.addCase(uptadePlayersLife.fulfilled, (state, action) => {
         console.log('fulfilled');
         const { id, life } = action.payload;
         state.players[id].life = life;
         state.error = null;
      });
      builder.addCase(uptadePlayersLife.rejected, (state, action) => {
         console.log('error');
         state.error = action.error.message;
      });
      builder.addCase(uptadePlayersBuff.pending, () => {
         console.log('pending');
      });
      builder.addCase(uptadePlayersBuff.fulfilled, (state, action) => {
         console.log('fulfilled');
         const { index, id, date } = action.payload;
         state.players[id].spells[index].date = date;
         state.error = null;
      });
      builder.addCase(uptadePlayersBuff.rejected, (state, action) => {
         console.log('error');
         state.error = action.error.message;
      });
      builder.addCase(deletePlayerBuff.pending, () => {
         console.log('pending');
      });
      builder.addCase(deletePlayerBuff.fulfilled, (state, action) => {
         console.log('fulfilled');
         const { id, index } = action.payload;
         state.players[id].spells[index].date = null;
         state.error = null;
      });
      builder.addCase(deletePlayerBuff.rejected, (state, action) => {
         console.log('error');
         state.error = action.error.message;
      });
   },
});
