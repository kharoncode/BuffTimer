type dataEl = {
   id: string;
   name: string;
   picture: string;
   currentLife: string;
   maxLife: string;
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

type data = dataEl[];

type spell = {
   id: string;
   name: string;
   date: null | number;
};

type spells = spell[];

export type player = {
   id: string;
   name: string;
   picture: string;
   life: {
      currentLife: number;
      maxLife: number;
   };
   spells: spells;
};

export type players = { [key: string]: player };

const formatPlayer = (el: dataEl) => {
   const spellsName = {
      benedictionDeKeldar: 'Bénédiction de Keldar',
      attaqueSacree: 'Attaque Sacrée',
      grandeBenedictionDeKeldar: 'Grd Bénédiction de Keldar',
      lameDeJustice: 'Lame de Justice',
      transcendance: 'Transcendance',
      regenerationMineure: 'Régénération Mineure',
      resistance: 'Résistance',
      salutDuDivin: 'Salut du Divin',
      regeneration: 'Régénération',
      capriceDuDestin: 'Caprice du Destin',
      chatiment: 'Chatiment',
   };

   const spells: spells = [];
   for (let i = 5; i < Object.keys(el).length; i++) {
      spells.push({
         id: Object.keys(el)[i],
         name: spellsName[Object.keys(el)[i] as keyof typeof spellsName],
         date:
            Object.values(el)[i] === null ? null : Number(Object.values(el)[i]),
      });
   }

   return {
      id: el.id,
      name: el.name,
      picture: el.picture,
      life: {
         currentLife: Number(el.currentLife),
         maxLife: Number(el.maxLife),
      },
      spells: spells,
   };
};

export const formatPlayers = (data: data) => {
   const players: players = {};
   data.map((el) => (players[`${el.id}`] = formatPlayer(el)));
   return players;
};
