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

export const uptadeUserPlayerLife = createAsyncThunk(
   'players/uptadeUserPlayerLife',
   async (newLife: newLife) => {
      const { id, life } = newLife;
      const body = {
         condition: { id: id },
         set: {
            currentLife: life.currentLife,
            maxLife: life.maxLife,
         },
      };
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

type newMessage = {
   id: string;
   message: string;
};

export const uptadeUserPlayerMessage = createAsyncThunk(
   'players/uptadeUserPlayerMessage',
   async (newMessage: newMessage) => {
      const { id, message } = newMessage;
      const body = {
         condition: { id: id },
         set: {
            message: message,
         },
      };
      return fetch(`${import.meta.env.VITE_API}/players`, {
         method: 'put',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body),
      })
         .then((result) => result.json())
         .then(() => {
            return newMessage;
         });
   }
);

type newSpell = {
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
   id: string;
   spell: string;
};

type setDelete = { [key: string]: 'null' };

export const deletePlayerBuff = createAsyncThunk(
   'players/deletePlayerBuff',
   async (removeSpell: spellId) => {
      const { id, spell } = removeSpell;
      const set: setDelete = {};
      set[spell] = 'null';
      const body = {
         condition: { id: id },
         set: set,
      };
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
         console.log('fetchPlayers:pending');
         state.loading = true;
      });
      builder.addCase(fetchPlayers.fulfilled, (state, action) => {
         console.log('fetchPlayers:fulfilled');
         state.loading = false;
         state.players = action.payload;
         state.error = null;
      });
      builder.addCase(fetchPlayers.rejected, (state, action) => {
         console.log('fetchPlayers:error');
         state.loading = false;
         state.players = {};
         state.error = action.error.message;
      });
      builder.addCase(uptadeUserPlayerLife.pending, () => {
         console.log('uptadeUserPlayerLife:pending');
      });
      builder.addCase(uptadeUserPlayerLife.fulfilled, (state, action) => {
         console.log('uptadeUserPlayerLife:fulfilled');
         const { id, life } = action.payload;
         state.players[id].life = life;
         state.error = null;
      });
      builder.addCase(uptadeUserPlayerLife.rejected, (state, action) => {
         console.log('uptadeUserPlayerLife:error');
         state.error = action.error.message;
      });
      builder.addCase(uptadeUserPlayerMessage.pending, () => {
         console.log('uptadeUserPlayerMessage:pending');
      });
      builder.addCase(uptadeUserPlayerMessage.fulfilled, (state, action) => {
         console.log('uptadeUserPlayerMessage:fulfilled');
         const { id, message } = action.payload;
         state.players[id].message = message;
         state.error = null;
      });
      builder.addCase(uptadeUserPlayerMessage.rejected, (state, action) => {
         console.log('uptadeUserPlayerMessage:error');
         state.error = action.error.message;
      });
      builder.addCase(uptadePlayersBuff.pending, () => {
         console.log('uptadePlayersBuff:pending');
      });
      builder.addCase(uptadePlayersBuff.fulfilled, (state, action) => {
         console.log('uptadePlayersBuff:fulfilled');
         const { spell, id, date } = action.payload;
         state.players[id].spells[spell].date = date;
         state.error = null;
      });
      builder.addCase(uptadePlayersBuff.rejected, (state, action) => {
         console.log('uptadePlayersBuff:error');
         state.error = action.error.message;
      });
      builder.addCase(deletePlayerBuff.pending, () => {
         console.log('deletePlayerBuff:pending');
      });
      builder.addCase(deletePlayerBuff.fulfilled, (state, action) => {
         console.log('deletePlayerBuff:fulfilled');
         const { id, spell } = action.payload;
         state.players[id].spells[spell].date = null;
         state.error = null;
      });
      builder.addCase(deletePlayerBuff.rejected, (state, action) => {
         console.log('deletePlayerBuff:error');
         state.error = action.error.message;
      });
   },
});
