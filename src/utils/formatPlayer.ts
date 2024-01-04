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

export type data = dataEl[];

export type spell = {
   id: string;
   name: string;
   category: string;
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
      benedictionDeKeldar: {
         name: 'Bénédiction de Keldar',
         category: 'justice',
      },
      attaqueSacree: { name: 'Attaque Sacrée', category: 'justice' },
      grandeBenedictionDeKeldar: {
         name: 'Grd Bénédiction de Keldar',
         category: 'justice',
      },
      lameDeJustice: { name: 'Lame de Justice', category: 'justice' },
      transcendance: { name: 'Transcendance', category: 'justice' },
      regenerationMineure: {
         name: 'Régénération Mineure',
         category: 'protection',
      },
      resistance: { name: 'Résistance', category: 'protection' },
      salutDuDivin: { name: 'Salut du Divin', category: 'protection' },
      regeneration: { name: 'Régénération', category: 'protection' },
      capriceDuDestin: { name: 'Caprice du Destin', category: 'protection' },
      chatiment: { name: 'Chatiment', category: 'protection' },
   };

   const spells: spells = [];
   for (let i = 5; i < Object.keys(el).length; i++) {
      spells.push({
         id: Object.keys(el)[i],
         name: spellsName[Object.keys(el)[i] as keyof typeof spellsName].name,
         category:
            spellsName[Object.keys(el)[i] as keyof typeof spellsName].category,
         date:
            Object.values(el)[i] === 'null'
               ? null
               : Number(Object.values(el)[i]),
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
