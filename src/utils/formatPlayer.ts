import { getDataSpellsStore } from '@/router/selectors';
import { store } from '@/router/store';

type dataEl = {
   id: string;
   name: string;
   picture: string;
   currentLife: string;
   maxLife: string;
   message: string;
   benedictionDeKeldar: string;
   attaqueSacree: string;
   grandeBenedictionDeKeldar: string;
   lameDeJustice: string;
   transcendance: string;
   regenerationMineure: string;
   resistance: string;
   salutDuDivin: string;
   regeneration: string;
   capriceDuDestin: string;
   chatiment: string;
};

export type data = dataEl[];

export type spell = {
   id: string;
   name: string;
   category: string;
   date: null | number;
};

type spells = { [key: string]: spell };

export type player = {
   id: string;
   name: string;
   picture: string;
   life: {
      currentLife: number;
      maxLife: number;
   };
   message: string;
   spells: spells;
};

export type players = { [key: string]: player };

const formatPlayer = (el: dataEl) => {
   const spellsData = getDataSpellsStore(store);

   const spells: spells = {};
   for (let i = 6; i < Object.keys(el).length; i++) {
      spells[Object.keys(el)[i]] = {
         id: Object.keys(el)[i],
         name: spellsData[Object.keys(el)[i] as keyof typeof spellsData].name,
         category:
            spellsData[Object.keys(el)[i] as keyof typeof spellsData].category,
         date:
            Object.values(el)[i] === 'null'
               ? null
               : Number(Object.values(el)[i]),
      };
   }

   return {
      id: el.id,
      name: el.name,
      picture: el.picture,
      life: {
         currentLife: Number(el.currentLife),
         maxLife: Number(el.maxLife),
      },
      message: el.message,
      spells: spells,
   };
};

export const formatPlayers = (data: data) => {
   const players: players = {};
   data.map((el) => (players[`${el.id}`] = formatPlayer(el)));
   return players;
};
